const fs = require('fs');
const ejs = require('ejs');
const nodeHtmlToImage = require('node-html-to-image')

const DIST_DIR = './dist/schedule/';
const IMG_DIR = './dist/img/';
const SRC_DIR = './src/schedule/';
const GLOBAL_STYLES_FILENAME = './global_styles.css';
const READING_OPTIONS = { encoding: 'utf8' };

let globalCSS = fs.readFileSync(GLOBAL_STYLES_FILENAME, READING_OPTIONS);

clearDistAndRebuildEmptyDirs();

fs.readdirSync(SRC_DIR).forEach(filename => {
    let htmlSourceContents = fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS);
    let renderedHTMLWithCSS = applyCssStyles(htmlSourceContents, globalCSS);
    fs.writeFileSync(`${DIST_DIR}${filename}`, renderedHTMLWithCSS); // Write schedule to disk with styles

    let pngFilename = filename.replace('.html', '') + '.png';
    let bodyWidth = getBodyWidth(htmlSourceContents);
    let imgCSS = bodyWidth ? globalCSS + bodyWidth : globalCSS;
    imgCSS += getBodyStylesForScreenshot();

    nodeHtmlToImage({ output: IMG_DIR + pngFilename, html: applyCssStyles(htmlSourceContents, imgCSS) })
        .then(() => console.log(`Image: ${pngFilename} was created successfully!`));
});

function applyCssStyles(contents, css) {
    return ejs.render(contents, {CSS_STYLES: css});
}

function getBodyWidth(html) {
    // Throw this comment with a width to apply a body width
    const BODY_WIDTH_MATCHER = /<!-- BODY-(\d*?) -->/;
    let match = html.match(BODY_WIDTH_MATCHER);

    return match && match[1] ? `body { width: ${match[1]}px }` : -1;
}

function getBodyStylesForScreenshot() {
    return `
    body { 
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 850px;
    }
    .code-container {
        margin: 0 !important;
        overflow-x: unset !important;
    }`;
}

function clearDistAndRebuildEmptyDirs() {
    fs.rmdirSync(DIST_DIR, { recursive: true });
    fs.rmdirSync(IMG_DIR, { recursive: true });
    fs.mkdirSync(DIST_DIR);
    fs.mkdirSync(IMG_DIR);
}