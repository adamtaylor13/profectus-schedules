const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const { CssGenerator } = require("./CssGenerator");
const { ScheduleBuilder } = require("./ScheduleBuilder");

const DIST_DIR = "./dist/schedule/";
const IMG_DIR = "./dist/img/";
const SRC_DIR = "./src/schedule/";
const READING_OPTIONS = { encoding: "utf8" };

const css = new CssGenerator();

clearDistAndRebuildEmptyDirs();

fs.readdirSync(SRC_DIR).forEach((filename) => {
    let contents = JSON.parse(
        fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS)
    );

    const schedule = new ScheduleBuilder(contents, css)
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent();

    writeHtmlToDisk(filename, schedule.renderForWeb());

    let pngFilename = filename.replace(".json", "") + ".png";
    nodeHtmlToImage({
        output: IMG_DIR + pngFilename,
        html: schedule.renderForImg(),
    }).then(() =>
        console.log(`Image: ${pngFilename} was created successfully!`)
    );
});

// Write schedule to disk with styles
function writeHtmlToDisk(filename, renderedHTMLWithCSS) {
    let saveFilename = `${DIST_DIR}${filename.replace("json", "html")}`;
    fs.writeFileSync(saveFilename, renderedHTMLWithCSS);
}

function clearDistAndRebuildEmptyDirs() {
    fs.rmdirSync(DIST_DIR, { recursive: true });
    fs.rmdirSync(IMG_DIR, { recursive: true });
    fs.mkdirSync(DIST_DIR);
    fs.mkdirSync(IMG_DIR);
}
