import * as fs from "fs";
import ScheduleBuilder from "./src/ScheduleBuilder";
import CssGenerator from "./src/CssGenerator";
import nodeHtmlToImage from "node-html-to-image";
import schedules from "./src/schedule";
import { ScheduleConfig } from "./src/schedule";

const DIST_SCHEDULE_DIR = "./dist/schedule/";
const DIST_IMG_DIR = "./dist/img/";

const css = new CssGenerator();

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

// TODO: Make a hashmap of classes so that it's easier to work with in schedule builder
// TODO: Pre-generate minColspan
// TODO: Pre-generate allSortedDays

schedules.forEach((scheduleConfig: ScheduleConfig) => {
    const schedule = new ScheduleBuilder(scheduleConfig, css)
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
