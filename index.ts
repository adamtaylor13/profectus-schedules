import * as fs from "fs";
import ScheduleBuilder from "./src/ScheduleBuilder";
import CssGenerator from "./src/CssGenerator";
import nodeHtmlToImage from "node-html-to-image";
import schedules, { ScheduleConfig } from "./src/schedule";

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
                dayMap[day] = dayMap[day] ?? {};
                if (dayMap[day][name]) {
                    dayMap[day][name].push({ ...classRest, time: name });
                    maxNumSimultaneousClasses = Math.max(
                        dayMap[day][name].length,
                        maxNumSimultaneousClasses
                    );
                } else {
                    dayMap[day][name] = [];
                    dayMap[day][name].push({ ...classRest, time: name });
                }

                timeMap[name][day] = timeMap[name][day] ?? [];
                timeMap[name][day].push({ ...classRest, day });
            }
        }
    }

    // By default, the xAxis is days of the week and the yAxis are the class times
    const xAxis = dayMap;
    const yAxis = timeMap;

    const schedule = new ScheduleBuilder({
        scheduleConfig,
        cssGenerator,
        xAxis,
        yAxis,
        minColspan: maxNumSimultaneousClasses
    })
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent();

    writeHtmlToDisk(scheduleConfig.distFilename, schedule.renderForWeb());

    let pngFilename = scheduleConfig.distFilename.replace(".html", ".png");
    nodeHtmlToImage({
        output: DIST_IMG_DIR + pngFilename,
        html: schedule.renderForImg(),
    }).then(() =>
        console.log(`Image: ${pngFilename} was created successfully!`)
    );
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
