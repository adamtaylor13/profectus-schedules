import * as fs from "fs";
import ScheduleBuilder from "./src/ScheduleBuilder";
import CssGenerator from "./src/CssGenerator";
import schedules, { ScheduleConfig } from "./src/schedule";
import { DEFAULT_DAY_ORDER } from "./src/constants";
import { orderBySortedList, timeSort } from "./src/tools";
import * as util from "util";

const DIST_SCHEDULE_DIR = "./dist/schedule/";
const DIST_IMG_DIR = "./dist/img/";

const cssGenerator = new CssGenerator();

// Stolen: https://stackoverflow.com/a/7616484/6535053
// @ts-ignore
String.prototype.hashCode = function () {
    var hash = 0,
        i,
        chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

clearDistAndRebuildEmptyDirs();

// TODO: Calculate all the times in increments of 15min and then plot out all the
//    classes. We will remove rows with no classes.

schedules.forEach((scheduleConfig: ScheduleConfig) => {
    const dayMap = {};
    const timeMap = {};
    let maxNumSimultaneousClasses = 1;

    for (const time of scheduleConfig.times) {
        const { name } = time;
        timeMap[name] = timeMap[name] ?? {};
        for (const clazz of time.classes) {
            const { days, ...classRest } = clazz;
            // @ts-ignore - TODO: How do I make TS recognize this?
            classRest.uuid = JSON.stringify(clazz).hashCode();
            for (const day of days) {
                let span = maxNumSimultaneousClasses;
                dayMap[day] = dayMap[day] ?? {};
                if (dayMap[day][name]) {
                    let numClasses = dayMap[day][name].length + 1; // +1 because this class is going in the list
                    maxNumSimultaneousClasses = Math.max(
                        numClasses,
                        maxNumSimultaneousClasses
                    );
                    span = maxNumSimultaneousClasses / numClasses;
                    dayMap[day][name].push({
                        ...classRest,
                        time: name,
                        span: span,
                    });
                    dayMap[day][name].forEach((classTime, index) => {
                        dayMap[day][name][index] = { ...classTime, span };
                    });
                } else {
                    dayMap[day][name] = [];
                    dayMap[day][name].push({ ...classRest, time: name });
                }

                timeMap[name][day] = timeMap[name][day] ?? [];
                timeMap[name][day].push({
                    ...classRest,
                    day,
                    starttime: name,
                    span,
                });
            }
        }
    }

    // By default, the xAxis is days of the week and the yAxis are the class times
    const xAxis = dayMap;
    const yAxis = timeMap;

    // console.log("dayMap", dayMap);
    let rows = [];
    let secondClass;

    // For invert where rows === days
    // for (const day of Object.keys(dayMap).sort(
    //     orderBySortedList(DEFAULT_DAY_ORDER)
    // )) {
    //     let columns = [];
    //     let simultaneousColumns = [];
    //
    //     for (const time of Object.keys(timeMap)) {
    //         let dayMapElementElement = dayMap[day][time] ?? [
    //             { label: "EMPTY_CELL" },
    //         ];
    //
    //         // TODO: WIll fail with more than 2 simul classes
    //         let hasSimulClass = dayMapElementElement[1];
    //         if (hasSimulClass) {
    //             let [firstClass, secondClass] = dayMapElementElement;
    //             columns.push([firstClass]);
    //             simultaneousColumns.push([secondClass]);
    //         } else {
    //             columns.push(dayMapElementElement);
    //             simultaneousColumns.push([{ label: "NO_RENDER" }]);
    //         }
    //     }
    //
    //     rows.push({ rowKey: day, cols: columns });
    //     let theSimultaneousRow = {
    //         rowKey: "SIMUL",
    //         cols: simultaneousColumns,
    //     };
    //     // Should only contain the single class being on the next row
    //     rows.push(theSimultaneousRow);
    // }

    let invert = false;

    // For regular where rows === time
    // for (const time of Object.keys(timeMap).sort(timeSort)) {
    //     let eventualFoo = [];
    //     for (const day of Object.keys(dayMap).sort(
    //         orderBySortedList(DEFAULT_DAY_ORDER)
    //     )) {
    //         let dayMapElementElement = timeMap[time][day];
    //         eventualFoo.push(
    //             dayMapElementElement ?? [{ label: "EMPTY_RENDER " }]
    //             // JSON.parse(
    //             //     `[${`{ "label": "EMPTY_RENDER" },`
    //             //         .repeat(maxNumSimultaneousClasses)
    //             //         .slice(0, -1)}]`
    //             // )
    //         );
    //     }
    //     rows.push({ rowKey: time, cols: eventualFoo });
    // }

    // rows.forEach((row) => {
    //     console.log("row", util.inspect(row, false, null, true));
    // });
    // console.log(invert ? "rows" : "cols", rows.length);
    // console.log("timeMap", timeMap);

    const schedule = new ScheduleBuilder({
        scheduleConfig,
        cssGenerator,
        timeMap,
        dayMap,
        minColspan: maxNumSimultaneousClasses,
    })
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent();

    writeHtmlToDisk(scheduleConfig.distFilename, schedule.renderForWeb());

    // let pngFilename = scheduleConfig.distFilename.replace(".html", ".png");
    // nodeHtmlToImage({
    //     output: DIST_IMG_DIR + pngFilename,
    //     html: schedule.renderForImg(),
    // }).then(() =>
    //     console.log(`Image: ${pngFilename} was created successfully!`)
    // );
});

// Write schedule to disk with styles
function writeHtmlToDisk(filename, renderedHTMLWithCSS) {
    let saveFilename = `${DIST_SCHEDULE_DIR}${filename}`;
    fs.writeFileSync(saveFilename, renderedHTMLWithCSS);
}

function clearDistAndRebuildEmptyDirs() {
    fs.rmdirSync(DIST_SCHEDULE_DIR, { recursive: true });
    fs.rmdirSync(DIST_IMG_DIR, { recursive: true });
    fs.mkdirSync(DIST_SCHEDULE_DIR);
    fs.mkdirSync(DIST_IMG_DIR);
}
function noEmptyRenders({ label }) {
    return label !== "EMPTY_RENDER";
}
