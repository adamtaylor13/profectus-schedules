import { DEFAULT_DAY_ORDER } from "./constants";
import {
    ColumnCell,
    DayMap,
    ClassColumn,
    Row,
    TimeMap,
    BasicColumn,
} from "./schedule/types";
import { orderBySortedList, timeSort } from "./tools";

/**
 * TODO: Keep adding more strong typing
 */

function getClassForContentCell(classHere: ClassColumn) {
    let maybeTags = classHere?.tags;
    return maybeTags?.days?.includes(classHere.day) ? maybeTags?.tag : "";
}

function trimTimePeriod(col: ClassColumn) {
    let name = col?.nameOverride ?? col.time;
    return name.replace(/[ap]m/g, "");
}

function assertClassTime(col: any): asserts col is ClassColumn {
    if (!col.day) {
        throw new Error("This isn't a robust class time");
    }
}

function generateClassColumnContent(col: ClassColumn) {
    let arr = [...col.label];
    arr.push(`${trimTimePeriod(col)}-${col.endtime}`);
    return arr.join("<br>");
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
        const EMPTY_COL: BasicColumn = { type: "EMPTY" };
        const NULL_COL: BasicColumn = { type: "NULL" };
        let rows: Row[] = [];

        if (this.config.invert) {
            self.spanProp = "rowspan";
            for (const day of Object.keys(this.dayMap).sort(
                orderBySortedList(self.config.sortedList)
            )) {
                let columns: ColumnCell[] = [];
                let simultaneousColumns: ColumnCell[] = [];

                for (const time of Object.keys(this.timeMap).sort(timeSort)) {
                    // TODO: Will fail with more than 2 overlapping classes
                    let classList: ClassColumn[] = this.dayMap[day][time];
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
                            type: "CLASS",
                            spanProp: `${self.spanProp}="${firstClass.span}"`,
                        });
                        simultaneousColumns.push({
                            ...overlapClass,
                            type: "CLASS",
                            spanProp: `${self.spanProp}="${overlapClass.span}"`,
                        });
                    } else {
                        columns.push({
                            ...classList[0],
                            type: "CLASS",
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
                let cols: ColumnCell[] = [];
                for (const day of Object.keys(this.dayMap).sort(
                    orderBySortedList(self.config.sortedList)
                )) {
                    let classList: ClassColumn[] = this.timeMap[time][day];
                    if (!classList) {
                        cols.push(EMPTY_COL);
                    } else {
                        cols.push(
                            ...classList.map((r) => {
                                const spanNumber = r.span ?? self.minColspan;
                                const spanProp =
                                    `${self.spanProp}="${spanNumber}"` as const;
                                return { ...r, spanProp };
                            })
                        );
                    }
                }
                rows.push({ rowKey: time, rowType: "class", cols });
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
        // let width = self.config.invert ? 250 : 250 / self.minColspan;
        // TODO: This is a good baseline, but doesn't work with simultaneous classes
        let width = 155;
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

    renderColumn(col: ColumnCell) {
        const self = this;
        switch (col.type) {
            case "EMPTY": {
                return self.renderEmptyContentCell(col);
            }
            case "NULL": {
                return null;
            }
            case "CLASS": {
                assertClassTime(col);
                let stretch =
                    !self.config.invert && col.stretch
                        ? `${self.config.invert ? `colspan` : `rowspan`}="${
                              col.stretch
                          }"`
                        : "";
                // prettier-ignore
                return `<td class="content-cell ${getClassForContentCell(col)}" ${col.spanProp} ${stretch}>${generateClassColumnContent(col)}</td>`;
            }
            default: {
                // TODO: Make this assert unreachable
                throw new Error("WHAT");
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
