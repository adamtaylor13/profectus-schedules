import * as fs from "fs";
import ScheduleBuilder from "./src/ScheduleBuilder";
import CssGenerator from "./src/CssGenerator";
import nodeHtmlToImage from "node-html-to-image";
import { DEFAULT_READING_OPTIONS } from "./src/constants";

const DIST_SCHEDULE_DIR = "./dist/schedule/";
const DIST_IMG_DIR = "./dist/img/";
const SRC_SCHEDULE_DIR = "./src/schedule/";

const css = new CssGenerator();

clearDistAndRebuildEmptyDirs();

fs.readdirSync(SRC_SCHEDULE_DIR).forEach((filename) => {
    // TODO: Create a type for our configs
    let config = JSON.parse(
        fs.readFileSync(
            `${SRC_SCHEDULE_DIR}${filename}`,
            DEFAULT_READING_OPTIONS
        )
    );

    const schedule = new ScheduleBuilder(config, css)
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent();

    writeHtmlToDisk(filename, schedule.renderForWeb());

    let pngFilename = filename.replace(".json", "") + ".png";
    nodeHtmlToImage({
        output: DIST_IMG_DIR + pngFilename,
        html: schedule.renderForImg(),
    }).then(() =>
        console.log(`Image: ${pngFilename} was created successfully!`)
    );
});

// Write schedule to disk with styles
function writeHtmlToDisk(filename, renderedHTMLWithCSS) {
    let saveFilename = `${DIST_SCHEDULE_DIR}${filename.replace(
        "json",
        "html"
    )}`;
    fs.writeFileSync(saveFilename, renderedHTMLWithCSS);
}

function clearDistAndRebuildEmptyDirs() {
    fs.rmdirSync(DIST_SCHEDULE_DIR, { recursive: true });
    fs.rmdirSync(DIST_IMG_DIR, { recursive: true });
    fs.mkdirSync(DIST_SCHEDULE_DIR);
    fs.mkdirSync(DIST_IMG_DIR);
}
