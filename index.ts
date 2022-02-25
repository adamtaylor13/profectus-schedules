import "./src/definitions";

import * as fs from "fs";
import ScheduleBuilder from "./src/ScheduleBuilder";
import CssGenerator from "./src/CssGenerator";
import schedules, { ScheduleConfig } from "./src/schedule";
import * as util from "util";
import { DayMap, RobustClassTime, TimeMap, Time } from "./src/schedule/types";

const DIST_SCHEDULE_DIR = "./dist/schedule/";
const DIST_IMG_DIR = "./dist/img/";

const cssGenerator = new CssGenerator();

clearDistAndRebuildEmptyDirs();

// TODO: Calculate all the times in increments of 15min and then plot out all the
//    classes. We will remove rows with no classes.

schedules.forEach((scheduleConfig: ScheduleConfig) => {
    const dayMap: DayMap = {};
    const timeMap: TimeMap = {};
    let maxNumSimultaneousClasses = scheduleConfig.maxSimultaneousClasses ?? 1;

    for (const time of Object.typedKeys(scheduleConfig.times)) {
        const { classes } = scheduleConfig.times[time];
        timeMap[time] = timeMap[time] ?? {};
        for (const clazz of classes) {
            let { days, ...classRest } = clazz;
            classRest.uuid = `${JSON.stringify(clazz).hashCode()}`;
            for (const day of days) {
                let span = maxNumSimultaneousClasses;
                dayMap[day] = dayMap[day] ?? {};
                if (dayMap[day][time]) {
                    let numClasses = dayMap[day][time].length + 1; // +1 because this class is going in the list
                    span = maxNumSimultaneousClasses / numClasses;
                    dayMap[day][time].push({
                        ...classRest,
                        type: "class",
                        day,
                        time: time,
                        span: span,
                    });
                    dayMap[day][time].forEach((classTime, index) => {
                        dayMap[day][time][index] = { ...classTime, span };
                    });
                } else {
                    dayMap[day][time] = [
                        { ...classRest, type: "class", day, time: time },
                    ];
                }

                if (timeMap[time][day]) {
                    let numClasses = timeMap[time][day].length + 1;
                    span = maxNumSimultaneousClasses / numClasses;
                    timeMap[time][day].push({
                        ...classRest,
                        type: "class",
                        day,
                        time: time,
                        span,
                    });
                    timeMap[time][day].forEach((classTime, index) => {
                        timeMap[time][day][index] = { ...classTime, span };
                    });
                } else {
                    timeMap[time][day] = [];
                    timeMap[time][day].push({
                        ...classRest,
                        type: "class",
                        day,
                        time: time,
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
