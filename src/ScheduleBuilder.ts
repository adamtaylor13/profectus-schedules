import { DEFAULT_DAY_ORDER } from "./constants";
import { Day } from "./schedule";
import { ClassTime, Col, Row } from "./schedule/types";
import { orderBySortedList, timeSort } from "./tools";
import * as util from "util";

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
    dayMap: any;
    timeMap: any;
    spanProp: "colspan" | "rowspan";

    constructor({
        scheduleConfig,
        cssGenerator,
        timeMap,
        dayMap,
        minColspan: maxNumSimulClasses,
    }) {
        scheduleConfig.sortedList =
            scheduleConfig.sortedList ?? DEFAULT_DAY_ORDER;
        this.config = scheduleConfig;
        this.cssGenerator = cssGenerator;
        this.minColspan = maxNumSimulClasses;
        this.timeMap = timeMap;
        this.dayMap = dayMap;

        return this;
    }

    getRows(): Row[] {
        let rows = [];

        if (this.config.invert) {
            this.spanProp = "rowspan";
            for (const day of Object.keys(this.dayMap).sort(
                orderBySortedList(DEFAULT_DAY_ORDER)
            )) {
                let columns = [];
                let simultaneousColumns = [];

                for (const time of Object.keys(this.timeMap).sort(timeSort)) {
                    let dayMapElementElement = this.dayMap[day][time] ?? [
                        { label: "EMPTY_RENDER" },
                    ];

                    dayMapElementElement.forEach((maybeClass) => {
                        // TODO: Dont override this, just add a new property
                        // debugger;
                        if (maybeClass.span) {
                            maybeClass.spanProp = `rowspan="${maybeClass.span}"`;
                        }
                    });

                    // TODO: WIll fail with more than 2 simul classes
                    let hasSimulClass = dayMapElementElement[1];
                    if (hasSimulClass) {
                        let [firstClass, secondClass] = dayMapElementElement;
                        columns.push([firstClass]);
                        simultaneousColumns.push([secondClass]);
                    } else {
                        columns.push(dayMapElementElement);
                        simultaneousColumns.push([{ label: "NO_RENDER" }]);
                    }
                }

                rows.push({ rowKey: day, cols: columns });
                let theSimultaneousRow = {
                    rowKey: "SIMUL",
                    cols: simultaneousColumns,
                };
                // Should only contain the single class being on the next row
                rows.push(theSimultaneousRow);
            }
        } else {
            this.spanProp = "colspan";
            for (const time of Object.keys(this.timeMap).sort(timeSort)) {
                let eventualFoo = [];
                for (const day of Object.keys(this.dayMap).sort(
                    orderBySortedList(DEFAULT_DAY_ORDER)
                )) {
                    let dayMapElementElement = this.timeMap[time][day];
                    eventualFoo.push(
                        dayMapElementElement ?? [{ label: "EMPTY_RENDER " }]
                    );
                }
                rows.push({ rowKey: time, cols: eventualFoo });
            }
        }

        console.log(
            this.config.invert ? "rows" : "cols",
            util.inspect(rows, false, null, true)
        );
        return rows;
    }

    // TODO: Memoize this
    sortedXAxis() {
        let sort = this.config.invert
            ? timeSort
            : orderBySortedList(this.config.sortedList);

        let o = this.config.invert ? this.timeMap : this.dayMap;
        return Object.keys(o).sort(sort);
    }

    // TODO: Memoize this
    sortedYAxis() {
        let sort = this.config.invert
            ? orderBySortedList(this.config.sortedList)
            : timeSort;
        return Object.keys(this.timeMap).sort(sort);
    }

    getTimeSeriesKey(xAxisKey, yAxisKey) {
        return this.config.invert ? xAxisKey : yAxisKey;
    }

    getDaySeriesKey(xAxisKey, yAxisKey) {
        return this.config.invert ? yAxisKey : xAxisKey;
    }

    getColspan(classHere) {
        return this.config.invert ? classHere.stretch ?? 1 : this.minColspan;
    }

    getRowspan(classHere) {
        return this.config.invert ? this.minColspan : classHere.stretch ?? 1;
    }

    getClassesFromSeriesAxes(xAxis, xAxisKey, yAxis, yAxisKey) {
        return this.config.invert
            ? yAxis[yAxisKey][xAxisKey]
            : xAxis[xAxisKey][yAxisKey];
    }

    generateColGroup() {
        let self = this;
        // let width = 250 / self.minColspan;
        let width = self.config.invert ? 250 : 250 / self.minColspan;
        this.columnGroup = `
        <!-- Used to define the widths of the columns -->
        <colgroup>
            <col style="width: 70px">
            ${this.sortedXAxis()
                .map(() => {
                    let repeat = self.config.invert ? 1 : self.minColspan;
                    return `<col style="width: ${width}px">`.repeat(repeat);
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
                    let colspan = self.config.invert ? 1 : self.minColspan;
                    return `<th class="header" colspan="${colspan}">${xDataKey}</th>`;
                })
                .join("\n\t")}
        </tr>`;
        return this;
    }

    generateScheduleRows() {
        let self = this;

        let rows = this.getRows();

        this.scheduleRows = rows
            .map((row) => {
                let rowKey = row.rowKey === "SIMUL" ? "" : row.rowKey;
                let flatMap = row.cols.flatMap((foo) => self.renderColumn(foo));
                let span = row.rowKey === "SIMUL" ? "" : self.getSpan({});
                let s =
                    row.rowKey === "SIMUL"
                        ? ""
                        : `<td class="time-cell"${span}>${rowKey}</td>`;
                let renderedRow = `
        <tr ${this.config.thick ? `class="thick"` : ""}>
            ${s}
            ${flatMap
                .filter(Boolean) // Don't include empty rows
                .join("\n")}
        </tr>`;

                return renderedRow;
            })
            .join("\n");

        return this;
    }

    renderColumn(cols: Col[]) {
        const self = this;
        let map = cols.map((classTime) => {
            // TODO: Empty / No render should be arrays as well or maybe labels shouldnt' be arrays
            const label =
                classTime.label instanceof Array
                    ? classTime.label.join("")
                    : classTime.label;
            switch (label) {
                case "EMPTY_RENDER": {
                    return self.renderEmptyContentCell(classTime);
                }
                case "NO_RENDER": {
                    // TODO: Maybe just this?
                    return "";
                }
                default: {
                    const classForContentCell = getClassForContentCell(
                        classTime,
                        // @ts-ignore // TODO: Document this comes from map
                        classTime.day
                    );
                    let arr = [...classTime.label];
                    let time = classTime.nameOverride
                        ? classTime.nameOverride
                        : // @ts-ignore
                          classTime.time;
                    arr.push(`${trimTimePeriod(time)}-${classTime.endtime}`);
                    const multilineContent = arr.join("<br>");
                    let span = self.getSpan(classTime);
                    // prettier-ignore
                    return `<td class="content-cell${classForContentCell}" ${span}>${multilineContent}</td>`;
                }
            }
        });

        return map.filter(Boolean).join("\n");
    }

    getSpan(classTime) {
        const self = this;
        return classTime?.spanProp
            ? // @ts-ignore
              classTime?.spanProp
            : // @ts-ignore
            classTime?.span
            ? // @ts-ignore
              `${self.spanProp}="${classTime?.span}"`
            : `${self.spanProp}="${self.minColspan}"`;
    }

    // potentiallyEmptyRows({ xAxisKey, extraClasses }) {
    //     const self = this;
    //     // const rowspan = self.config.invert
    //     //     ? `rowspan="${self.minColspan}"`
    //     //     : "";
    //     const rowspan = ""; // TODO: TR doesn't need rowspan does it?
    //     if (extraClasses) {
    //         // debugger;
    //     }
    //     return `<tr ${rowspan}>${this.sortedXAxis().map((innerXAxisKey) => {
    //         return innerXAxisKey === xAxisKey
    //             ? extraClasses[0]
    //             : self.renderEmptyContentCell("", "", self.minColspan);
    //     })}</tr>`.repeat(self.minColspan - 1);
    // }

    // // TODO: Refactor to use class references
    // renderTableCells(
    //     dayspanTracker,
    //     yAxis,
    //     yAxisKey,
    //     xAxis,
    //     xAxisKey,
    //     maxSimulClassNum: number
    // ): string[] {
    //     const self = this;
    //     const day = this.getDaySeriesKey(xAxisKey, yAxisKey);
    //     const time = this.getTimeSeriesKey(xAxisKey, yAxisKey);
    //
    //     if (dayspanTracker[day]) {
    //         dayspanTracker[day]--;
    //         return [""];
    //     }
    //
    //     const classesHere = this.getClassesFromSeriesAxes(
    //         xAxis,
    //         xAxisKey,
    //         yAxis,
    //         yAxisKey
    //     );
    //
    //     if (!classesHere?.length) {
    //         return [this.renderEmptyContentCell(day, time, maxSimulClassNum)];
    //     }
    //
    //     return classesHere.map((classHere) => {
    //         let { stretch } = classHere;
    //         if (stretch) {
    //             // TODO: Make this property something like "additionalRows" rather than rowspan?
    //             let number = stretch - 1; // TODO: Why do we do this?
    //             dayspanTracker[day] =
    //                 dayspanTracker[day] === undefined
    //                     ? number
    //                     : dayspanTracker[day] + number;
    //         }
    //         let arr = [...classHere.label];
    //         let time = classHere.nameOverride
    //             ? classHere.nameOverride
    //             : classHere.time;
    //         arr.push(`${trimTimePeriod(time)}-${classHere.endtime}`);
    //         const multilineContent = arr.join("<br>");
    //
    //         const classForContentCell = getClassForContentCell(classHere, day);
    //
    //         const rowspan = self.config.invert
    //             ? `rowspan="${maxSimulClassNum}"`
    //             : classHere.stretch
    //             ? `rowspan="${classHere.stretch}"`
    //             : "";
    //         const colspan = self.config.invert
    //             ? classHere.stretch
    //                 ? `colspan="${classHere.stretch}"`
    //                 : ``
    //             : `colspan="${maxSimulClassNum}"`;
    //
    //         return `<td class="content-cell
    //             ${classForContentCell}"
    //             ${rowspan}
    //             ${colspan}>${multilineContent}</td>`;
    //     });
    // }
    //
    renderEmptyContentCell(classTime) {
        // Leave the day/time in the cell for clearer built files
        let span = classTime.span ?? `${this.spanProp}="${this.minColspan}"`;
        return `<td class="content-cell" ${span}><!-- ${classTime.day} @ ${classTime.time} --></td>`;
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
