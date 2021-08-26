const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const { ScheduleBuilder } = require("./ScheduleBuilder");

const DIST_DIR = "./dist/schedule/";
const IMG_DIR = "./dist/img/";
const SRC_DIR = "./src/schedule/";
const GLOBAL_STYLES_FILENAME = "./global_styles.css";
const READING_OPTIONS = { encoding: "utf8" };

let globalCSS = fs.readFileSync(GLOBAL_STYLES_FILENAME, READING_OPTIONS);

// TODO: Split functions into modules?

clearDistAndRebuildEmptyDirs();

fs.readdirSync(SRC_DIR).forEach((filename) => {
    let contents = JSON.parse(
        fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS)
    );

    const schedule = new ScheduleBuilder(contents)
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent();

    writeHtmlToDisk(filename, schedule.renderWithCss(globalCSS));

    let pngFilename = filename.replace(".json", "") + ".png";
    nodeHtmlToImage({
        output: IMG_DIR + pngFilename,
        html: schedule.renderWithCss(getImgCss(globalCSS, contents)),
    }).then(() =>
        console.log(`Image: ${pngFilename} was created successfully!`)
    );
});

// Write schedule to disk with styles
function writeHtmlToDisk(filename, renderedHTMLWithCSS) {
    let saveFilename = `${DIST_DIR}${filename.replace("json", "html")}`;
    fs.writeFileSync(saveFilename, renderedHTMLWithCSS);
}

function getImgCss(globalCss, { bodyWidth }) {
    if (!bodyWidth) {
        throw new Error("Must supply a bodyWidth");
    }

    return `
    ${globalCss}
    body { 
        width: ${bodyWidth}px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 850px;
    }
    .code-container {
        margin: 0 !important;
        overflow-x: unset !important;
    }
    `;
}

function clearDistAndRebuildEmptyDirs() {
    fs.rmdirSync(DIST_DIR, { recursive: true });
    fs.rmdirSync(IMG_DIR, { recursive: true });
    fs.mkdirSync(DIST_DIR);
    fs.mkdirSync(IMG_DIR);
}

module.exports = {
    getImgCss,
};
