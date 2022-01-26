import { DEFAULT_DAY_ORDER } from "./constants";

function getClassForContentCell(classHere, day) {
    if (classHere.tags) {
        return classHere.tags.days.includes(day) ? classHere.tags.tag : "";
    } else {
        return "";
    }
}

function getClassOnDay(classArray, day) {
    return classArray.reduce(
        (acc, curr) => (acc ? acc : curr.days.includes(day) ? curr : false),
        false
    );
}
function trimTimePeriod(name) {
    return name.replace(/[ap]m/g, "");
}

function getRowSpan(classHere) {
    return classHere.rowspan ? `rowspan="${classHere.rowspan}"` : "";
}

export default class ScheduleBuilder {
    config;
    columnGroup;
    headers;
    scheduleRows;
    fullHtmlContent;
    cssGenerator;

    constructor(config, cssGenerator) {
        config.sortedList = config.sortedList ?? DEFAULT_DAY_ORDER;
        this.config = config;
        this.cssGenerator = cssGenerator;
        return this;
    }

    // TODO: Is this memoized or called every damn time?
    allSortedDays() {
        let allDaysWithDupes: string[] = this.config.times.reduce(
            (acc, curr) => {
                let allClassDays = curr.classes.reduce(
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
        this.columnGroup = `
        <!-- Used to define the widths of the columns -->
        <colgroup>
            <col style="width: 70px">
            ${this.allSortedDays()
                .map(() => `<col style="width: 155px">`)
                .join("\n")}
        </colgroup>`;
        return this;
    }

    generateHeaders() {
        this.headers = `
        <tr>
            <th></th>
            ${this.allSortedDays()
                .map((day) => `<th class="header">${day}</th>`)
                .join("\n\t")}
        </tr>`;
        return this;
    }

    generateScheduleRows() {
        let rowspanTracker = {};
        this.scheduleRows = this.config.times
            .map(
                (time) =>
                    `
    <tr ${this.config.thick ? `class="thick"` : ""}>
        <td class="time-cell">${time.name}</td>
        ${this.allSortedDays()
            .map((day) => {
                if (rowspanTracker[day]) {
                    rowspanTracker[day]--;
                    return "";
                }
                const classHere = getClassOnDay(time.classes, day);
                if (classHere) {
                    let { rowspan } = classHere;
                    if (rowspan) {
                        // TODO: Make this property something like "additionalRows" rather than rowspan?
                        let number = parseInt(rowspan) - 1;
                        rowspanTracker[day] =
                            rowspanTracker[day] === undefined
                                ? number
                                : rowspanTracker[day] + number;
                    }
                    let arr = [...classHere.label];
                    let name = classHere.nameOverride
                        ? classHere.nameOverride
                        : time.name;
                    arr.push(`${trimTimePeriod(name)}-${classHere.endtime}`);
                    return `<td class="content-cell ${getClassForContentCell(
                        classHere,
                        day
                    )}" ${getRowSpan(classHere)}>${arr.join("<br>")}</td>`;
                } else {
                    return `<td class="content-cell"><!-- ${day} @ ${time.name} --></td>`;
                }
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
