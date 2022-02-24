import { DEFAULT_DAY_ORDER } from "./constants";
import { Day } from "./schedule";
import { ClassTime } from "./schedule/types";
import { orderBySortedList, timeSort } from "./tools";

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

function trimTimePeriod(name) {
    return name.replace(/[ap]m/g, "");
}

function getRowSpan(classHere) {
    return classHere.rowspan ? `rowspan="${classHere.rowspan}"` : "";
}

function renderEmptyContentCell(day, time, minColspan) {
    // Leave the day/time in the cell for clearer built files
    return `<td class="content-cell" colspan="${minColspan}"><!-- ${day} @ ${time} --></td>`;
}

export default class ScheduleBuilder {
    config;
    columnGroup;
    headers;
    scheduleRows; // TODO: Rename to just rows? yAxis row?
    fullHtmlContent;
    cssGenerator;
    minColspan: number;
    xAxis: {};
    yAxis: {};

    constructor({ scheduleConfig, cssGenerator, xAxis, yAxis, minColspan }) {
        scheduleConfig.sortedList =
            scheduleConfig.sortedList ?? DEFAULT_DAY_ORDER;
        this.config = scheduleConfig;
        this.cssGenerator = cssGenerator;
        this.minColspan = minColspan;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        if (this.config.invert) {
            this.xAxis = yAxis;
            this.yAxis = xAxis;
        }
        return this;
    }

    // TODO: Memoize this
    sortedXAxis() {
        let sort = this.config.invert
            ? timeSort
            : orderBySortedList(this.config.sortedList);
        return Object.keys(this.xAxis).sort(sort);
    }

    // TODO: Memoize this
    sortedYAxis() {
        let sort = this.config.invert
            ? orderBySortedList(this.config.sortedList)
            : timeSort;
        return Object.keys(this.yAxis).sort(sort);
    }

    getTimeSeriesKey(xAxisKey, yAxisKey) {
        return this.config.invert ? xAxisKey : yAxisKey;
    }

    getDaySeriesKey(xAxisKey, yAxisKey) {
        return this.config.invert ? yAxisKey : xAxisKey;
    }

    getClassesFromSeriesAxes(xAxis, xAxisKey, yAxis, yAxisKey) {
        return this.config.invert
            ? yAxis[yAxisKey][xAxisKey]
            : xAxis[xAxisKey][yAxisKey];
    }

    generateColGroup() {
        let self = this;
        let width = 250 / self.minColspan;
        this.columnGroup = `
        <!-- Used to define the widths of the columns -->
        <colgroup>
            <col style="width: 70px">
            ${this.sortedXAxis()
                .map(() => {
                    return `<col style="width: ${width}px">`.repeat(
                        self.minColspan
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
            ${this.sortedXAxis()
                .map((xDataKey) => {
                    return `<th class="header" colspan="${self.minColspan}">${xDataKey}</th>`;
                })
                .join("\n\t")}
        </tr>`;
        return this;
    }

    generateScheduleRows() {
        let self = this;
        let rowspanTracker: { [d in Day as string]: number } = {};
        this.scheduleRows = this.sortedYAxis()
            .map(
                (yAxisKey) => `
    <tr ${this.config.thick ? `class="thick"` : ""}>
        <td class="time-cell">${yAxisKey}</td>
        ${this.sortedXAxis()
            .flatMap((xAxisKey) => {
                let maxClassesAtThisTime =
                    self.xAxis[xAxisKey][yAxisKey]?.length ?? 1; // TODO: This is because sometimes it's emtpy (i.e. no definition)
                return this.renderTableCells(
                    rowspanTracker,
                    self.yAxis,
                    yAxisKey,
                    self.xAxis,
                    xAxisKey,
                    self.minColspan / maxClassesAtThisTime
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

    // TODO: Refactor to use class references
    renderTableCells(
        rowspanTracker,
        yAxis,
        yAxisKey,
        xAxis,
        xAxisKey,
        minColspan: number
    ) {
        const day = this.getDaySeriesKey(xAxisKey, yAxisKey);
        const time = this.getTimeSeriesKey(xAxisKey, yAxisKey);

        if (rowspanTracker[yAxisKey]) {
            rowspanTracker[yAxisKey]--;
            return "";
        }

        const classesHere = this.getClassesFromSeriesAxes(
            xAxis,
            xAxisKey,
            yAxis,
            yAxisKey
        );

        if (!classesHere?.length) {
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
            let time = classHere.nameOverride
                ? classHere.nameOverride
                : classHere.time;
            arr.push(`${trimTimePeriod(time)}-${classHere.endtime}`);
            const multilineContent = arr.join("<br>");

            const classForContentCell = getClassForContentCell(classHere, day);
            // TODO: How to handle inverted spanning?
            const rowSpan = getRowSpan(classHere);
            return `<td class="content-cell 
                ${classForContentCell}" 
                ${rowSpan} 
                colspan="${minColspan}">${multilineContent}</td>`;
        });
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
