import { DEFAULT_DAY_ORDER } from "./constants";
import { Day, ScheduleConfig } from "./schedule";
import { ClassDef, ClassTime } from "./schedule/types";

/**
 * TODO: Keep adding more strong typing
 */

function getClassForContentCell(classHere: ClassTime, day: Day) {
    if (classHere.tags) {
        return classHere.tags.days.includes(day) ? classHere.tags.tag : "";
    } else {
        return "";
    }
}

function getClassesOnDay(classArray: ClassTime[], day: Day) {
    return classArray.reduce((acc, curr) => {
        return curr.days.includes(day) ? [...acc, curr] : [];
    }, []);
}
function trimTimePeriod(name) {
    return name.replace(/[ap]m/g, "");
}

function getRowSpan(classHere) {
    return classHere.rowspan ? `rowspan="${classHere.rowspan}"` : "";
}

function renderEmptyContentCell(day, time, minColspan) {
    // Leave the day/time in the cell for clearer built files
    return `<td class="content-cell" colspan="${minColspan}"><!-- ${day} @ ${time.name} --></td>`;
}

function renderTableCells(
    rowspanTracker,
    day: Day,
    time: ClassDef,
    minColspan: number,
    simultaneousClasses
) {
    if (rowspanTracker[day]) {
        rowspanTracker[day]--;
        return "";
    }
    const classesHere: ClassTime[] = getClassesOnDay(time.classes, day);

    if (!classesHere.length) {
        return renderEmptyContentCell(day, time, minColspan);
    }

    return classesHere.map((classHere) => {
        let { rowspan } = classHere;
        if (rowspan) {
            // TODO: Make this property something like "additionalRows" rather than rowspan?
            let number = rowspan - 1; // TODO: Why do we do this?
            rowspanTracker[day] =
                rowspanTracker[day] === undefined
                    ? number
                    : rowspanTracker[day] + number;
        }
        let arr = [...classHere.label];
        let name = classHere.nameOverride ? classHere.nameOverride : time.name;
        arr.push(`${trimTimePeriod(name)}-${classHere.endtime}`);
        const multilineContent = arr.join("<br>");

        const classForContentCell = getClassForContentCell(classHere, day);
        const rowSpan = getRowSpan(classHere);
        return `<td class="content-cell 
                ${classForContentCell}" 
                ${rowSpan} 
                colspan="${
                    simultaneousClasses[classHere.uuid]
                        ? minColspan - (classesHere.length - 1)
                        : minColspan
                }">${multilineContent}</td>`;
    });
}

export default class ScheduleBuilder {
    config;
    columnGroup;
    headers;
    scheduleRows;
    fullHtmlContent;
    cssGenerator;
    simultaneousClassDays: { [k in number]?: ClassTime } = {};
    minimumColspan: number = 1;

    constructor(config: ScheduleConfig, cssGenerator) {
        config.sortedList = config.sortedList ?? DEFAULT_DAY_ORDER;
        this.config = config;
        this.config.times.forEach((time) => {
            time.classes.forEach((clazz) => {
                // @ts-ignore
                clazz.uuid = JSON.stringify(clazz).hashCode();
            });
        });
        this.allSortedDays(); // TODO: This is a hack; we should pre-generate our minColSpan

        this.cssGenerator = cssGenerator;
        return this;
    }

    // TODO: Is this memoized or called every damn time?
    allSortedDays(): Day[] {
        let self = this;
        let allDaysWithDupes: Day[] = this.config.times.reduce(
            (acc, curr: ClassDef) => {
                let classDays = {};
                for (const clazz of curr.classes) {
                    for (const day of clazz.days) {
                        if (classDays[day]) {
                            // Then we've got a day with simultaneous classes
                            self.simultaneousClassDays[clazz.uuid] = clazz;
                            // @ts-ignore
                            self.simultaneousClassDays[classDays[day].uuid] =
                                classDays[day];
                            self.minimumColspan = 2; // TODO: When does this go up to 3?
                        } else {
                            classDays[day] = clazz;
                        }
                    }
                }

                let allClassDays: Day[] = curr.classes.reduce(
                    (acc2, curr2) => [...acc2, ...curr2.days],
                    []
                );
                return [...acc, ...allClassDays];
            },
            []
        );

        return [...new Set(allDaysWithDupes)].sort((a, b) => {
            return this.config.sortedList.indexOf(a) >
                this.config.sortedList.indexOf(b)
                ? 1
                : -1;
        });
    }

    generateColGroup() {
        let self = this;
        let width = 250 / self.minimumColspan;
        this.columnGroup = `
        <!-- Used to define the widths of the columns -->
        <colgroup>
            <col style="width: 70px">
            ${this.allSortedDays()
                .map((foo) => {
                    let hasSimultaneousClass =
                        !!self.simultaneousClassDays[foo];
                    return `<col style="width: ${width}px">`.repeat(
                        self.minimumColspan
                    );
                })
                .join("\n")}
        </colgroup>`;
        return this;
    }

    generateHeaders() {
        let self = this;
        this.headers = `
        <tr>
            <th></th>
            ${this.allSortedDays()
                .map((day) => {
                    let hasSimultaneousClass =
                        !!self.simultaneousClassDays[day];
                    return `<th class="header" colspan="${self.minimumColspan}">${day}</th>`;
                })
                .join("\n\t")}
        </tr>`;
        return this;
    }

    generateScheduleRows() {
        let self = this;
        let rowspanTracker: { [d in Day as string]: number } = {};
        this.scheduleRows = this.config.times
            .map(
                (time) => `
    <tr ${this.config.thick ? `class="thick"` : ""}>
        <td class="time-cell">${time.name}</td>
        ${this.allSortedDays()
            .flatMap((day) => {
                let additionalColspan = self.simultaneousClassDays[day] ?? 0;
                let thisIsASimultaneousClass = time.classes.reduce(
                    (acc, curr) => {
                        return !!self.simultaneousClassDays[curr.uuid];
                    },
                    false
                );

                return renderTableCells(
                    rowspanTracker,
                    day,
                    time,
                    self.minimumColspan,
                    self.simultaneousClassDays
                );
            })
            .filter(Boolean) // Don't include empty rows
            .join("\n")}
    </tr>
    `
            )
            .join("\n");
        return this;
    }

    insertBottomContent() {
        if (!this.config.bottomContent) {
            return "";
        }

        return `
            <tr>
                <td colspan="8" style="color: white;">${this.config.bottomContent}</td>
            </tr>
        `;
    }

    generateTableHtmlContent() {
        if (!this.columnGroup || !this.headers || !this.scheduleRows) {
            throw new Error(
                "You must build the column group, headers, and schedule rows before getting the HTML content"
            );
        }

        this.fullHtmlContent = `
        <table class="schedule-table">
            ${this.columnGroup}
            ${this.headers}
            ${this.scheduleRows}
            ${this.insertBottomContent()}
        </table>`;

        return this;
    }

    renderWithCss(css) {
        return `
        <div class="code-container">
            <style>
                ${css}
            </style>
            ${this.fullHtmlContent}
        </div>`;
    }

    renderForWeb() {
        return this.renderWithCss(this.cssGenerator.cssForSite());
    }

    renderForImg() {
        return this.renderWithCss(
            this.cssGenerator.cssForImg(this.config.bodyWidth)
        );
    }
}
