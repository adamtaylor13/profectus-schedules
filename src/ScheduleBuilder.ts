import { DEFAULT_DAY_ORDER } from "./constants";
import { Col, DayMap, RobustClassTime, Row, TimeMap } from "./schedule/types";
import { orderBySortedList, timeSort } from "./tools";

/**
 * TODO: Keep adding more strong typing
 */

function getClassForContentCell(classHere: RobustClassTime) {
    let maybeTags = classHere?.tags;
    return maybeTags?.days?.includes(classHere.day) ? maybeTags?.tag : "";
}

function trimTimePeriod(name) {
    return name.replace(/[ap]m/g, "");
}

function assertClassTime(col: any): asserts col is RobustClassTime {
    if (!col.day) {
        throw new Error("This isn't a robust class time");
    }
}

export default class ScheduleBuilder {
    config;
    columnGroup;
    headers;
    scheduleRows; // TODO: Rename to just rows? yAxis row?
    fullHtmlContent;
    cssGenerator;
    minColspan: number;
    dayMap: DayMap;
    timeMap: TimeMap;
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
        const self = this;
        const EMPTY_COL: Omit<Col, "spanProp"> = { type: "EMPTY" };
        const NULL_COL: Omit<Col, "spanProp"> = { type: "NULL" };
        let rows: Row[] = [];

        if (this.config.invert) {
            self.spanProp = "rowspan";
            for (const day of Object.keys(this.dayMap).sort(
                orderBySortedList(DEFAULT_DAY_ORDER)
            )) {
                let columns: Col[] = [];
                let simultaneousColumns: Col[] = [];

                for (const time of Object.keys(this.timeMap).sort(timeSort)) {
                    // TODO: Will fail with more than 2 overlapping classes
                    let classList: RobustClassTime[] = this.dayMap[day][time];
                    if (!classList) {
                        columns.push(EMPTY_COL);
                        simultaneousColumns.push(NULL_COL);
                        continue;
                    }

                    // TODO: This will fail if we have more than 1 overlap class (i.e. a 3rd index)
                    let [firstClass, overlapClass] = classList;
                    if (overlapClass) {
                        columns.push({
                            ...firstClass,
                            type: "class",
                            spanProp: `${self.spanProp}="${firstClass.span}"`,
                        });
                        simultaneousColumns.push({
                            ...overlapClass,
                            type: "class",
                            spanProp: `${self.spanProp}="${overlapClass.span}"`,
                        });
                    } else {
                        columns.push({
                            ...classList[0],
                            type: "class",
                            spanProp: `${self.spanProp}="${classList[0].span}"`,
                        });
                        simultaneousColumns.push(NULL_COL);
                    }
                }

                // Thought: If we use a fori loop here, we can actually build the next row
                // as needed, rather than doing a bunch of checks. :thinking:
                rows.push({ rowKey: day, rowType: "class", cols: columns });
                let overlapRow: Row = {
                    rowType: "overlap",
                    cols: simultaneousColumns,
                };
                rows.push(overlapRow);
            }
        } else {
            self.spanProp = "colspan";
            for (const time of Object.keys(this.timeMap).sort(timeSort)) {
                let cols: Col[] = [];
                for (const day of Object.keys(this.dayMap).sort(
                    orderBySortedList(DEFAULT_DAY_ORDER)
                )) {
                    let classList: RobustClassTime[] = this.timeMap[time][day];
                    if (!classList) {
                        cols.push(EMPTY_COL);
                    } else {
                        cols.push(
                            ...classList.map((r) => ({
                                ...r,
                                spanProp: `${self.spanProp}="${
                                    r.span ?? self.minColspan
                                }"`,
                            }))
                        );
                    }
                }
                rows.push({
                    rowKey: time,
                    rowType: "class",
                    cols,
                });
            }
        }

        return rows;
    }

    // TODO: Figure a better way to get the colGroup generated
    sortedXAxis() {
        let sort = this.config.invert
            ? timeSort
            : orderBySortedList(this.config.sortedList);

        let o = this.config.invert ? this.timeMap : this.dayMap;
        return Object.keys(o).sort(sort);
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
                let headerSpan =
                    row.rowType === "overlap"
                        ? ""
                        : self.config.invert
                        ? `${self.spanProp}="${self.minColspan}"`
                        : ""; // Only the day headers inherit span settings
                let s =
                    row.rowType === "overlap"
                        ? ""
                        : `<td class="time-cell"${headerSpan}>${row.rowKey}</td>`;
                let renderedRow = `
        <tr ${this.config.thick ? `class="thick"` : ""}>
            ${s}
            ${row.cols
                .map((foo) => self.renderColumn(foo))
                .filter(Boolean) // Don't include empty rows
                .join("\n")}
        </tr>`;

                return renderedRow;
            })
            .join("\n");

        return this;
    }

    renderColumn(col: Col) {
        const self = this;
        switch (col.type) {
            case "EMPTY": {
                return self.renderEmptyContentCell(col);
            }
            case "NULL": {
                return null;
            }
            default: {
                assertClassTime(col);
                const classForContentCell = getClassForContentCell(col);
                let arr = [...col.label];
                let time = col.nameOverride
                    ? col.nameOverride
                    : // @ts-ignore
                      col.time;
                arr.push(`${trimTimePeriod(time)}-${col.endtime}`);
                const multilineContent = arr.join("<br>");
                // prettier-ignore
                return `<td class="content-cell ${classForContentCell}" ${col.spanProp}>${multilineContent}</td>`;
            }
        }
    }

    renderEmptyContentCell(classTime) {
        // Leave the day/time in the cell for clearer built files
        return `<td class="content-cell" ${this.spanProp}="${this.minColspan}"><!-- ${classTime.day} @ ${classTime.time} --></td>`;
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
