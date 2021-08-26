import ScheduleBuilder from "./src/ScheduleBuilder";

const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const { CssGenerator } = require("./src/CssGenerator");

const DIST_SCHEDULE_DIR = "./dist/schedule/";
const DIST_IMG_DIR = "./dist/img/";
const SRC_SCHEDULE_DIR = "./src/schedule/";
const READING_OPTIONS = { encoding: "utf8" };

const css = new CssGenerator();

clearDistAndRebuildEmptyDirs();

fs.readdirSync(SRC_SCHEDULE_DIR).forEach((filename) => {
    let contents = JSON.parse(
        fs.readFileSync(`${SRC_SCHEDULE_DIR}${filename}`, READING_OPTIONS)
    );

    const schedule = new ScheduleBuilder(contents, css)
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
