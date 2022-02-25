import * as fs from "fs";
import ScheduleBuilder from "./src/ScheduleBuilder";
import CssGenerator from "./src/CssGenerator";
import schedules, { ScheduleConfig } from "./src/schedule";
import * as util from "util";
import { DayMap, RobustClassTime, TimeMap } from "./src/schedule/types";

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
    const dayMap: DayMap = {};
    const timeMap: TimeMap = {};
    let maxNumSimultaneousClasses = scheduleConfig.maxSimultaneousClasses ?? 1;

    for (const time of scheduleConfig.times) {
        const { name } = time;
        timeMap[name] = timeMap[name] ?? {};
        for (const clazz of time.classes) {
            let { days, ...classRest } = clazz;
            // @ts-ignore - TODO: How do I make TS recognize this?
            classRest.uuid = JSON.stringify(clazz).hashCode();
            for (const day of days) {
                let span = maxNumSimultaneousClasses;
                dayMap[day] = dayMap[day] ?? {};
                if (dayMap[day][name]) {
                    let numClasses = dayMap[day][name].length + 1; // +1 because this class is going in the list
                    span = maxNumSimultaneousClasses / numClasses;
                    dayMap[day][name].push({
                        ...classRest,
                        type: "class",
                        day,
                        time: name,
                        span: span,
                    });
                    dayMap[day][name].forEach((classTime, index) => {
                        dayMap[day][name][index] = { ...classTime, span };
                    });
                } else {
                    dayMap[day][name] = [
                        { ...classRest, type: "class", day, time: name },
                    ];
                }

                if (timeMap[name][day]) {
                    let numClasses = timeMap[name][day].length + 1;
                    span = maxNumSimultaneousClasses / numClasses;
                    timeMap[name][day].push({
                        ...classRest,
                        type: "class",
                        day,
                        time: name,
                        span,
                    });
                    timeMap[name][day].forEach((classTime, index) => {
                        timeMap[name][day][index] = { ...classTime, span };
                    });
                } else {
                    timeMap[name][day] = [];
                    timeMap[name][day].push({
                        ...classRest,
                        type: "class",
                        day,
                        time: name,
                        span,
                    });
                }
            }
        }
    }

    // console.log("dayMap", util.inspect(dayMap, false, null, true));
    // console.log("timeMap", timeMap);

    let invert = scheduleConfig.invert;
    console.log("invert?", invert);
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

    // TODO: NO MORE IMAGES
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
