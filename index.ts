import "./src/definitions";

import * as fs from "fs";
import ScheduleBuilder from "./src/ScheduleBuilder";
import CssGenerator from "./src/CssGenerator";
import schedules, { ScheduleConfig } from "./src/schedule";
import { DayMap, TimeMap } from "./src/schedule/types";
import {
    generateDayMap,
    generateTimeMap,
    getCollisionMap,
    getMaxSimultaneousClasses,
} from "./src/tools";

const DIST_SCHEDULE_DIR = "./dist/schedule/";
const DIST_IMG_DIR = "./dist/img/";

const cssGenerator = new CssGenerator();

clearDistAndRebuildEmptyDirs();

// TODO: Calculate all the times in increments of 15min and then plot out all the
//    classes. We will remove rows with no classes.

schedules.forEach((scheduleConfig: ScheduleConfig) => {
    const collisions = getCollisionMap(scheduleConfig);
    const maxNumSimultaneousClasses = getMaxSimultaneousClasses(collisions);
    const dayMap: DayMap = generateDayMap(
        scheduleConfig,
        collisions,
        maxNumSimultaneousClasses
    );
    const timeMap: TimeMap = generateTimeMap(
        scheduleConfig,
        collisions,
        maxNumSimultaneousClasses
    );

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
