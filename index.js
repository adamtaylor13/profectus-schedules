const fs = require('fs');
const ejs = require('ejs');
const nodeHtmlToImage = require('node-html-to-image')

const DIST_DIR = './dist/schedule/';
const IMG_DIR = './dist/img/';
const SRC_DIR = './src/schedule/';
const GLOBAL_STYLES_FILENAME = './global_styles.css';
const READING_OPTIONS = { encoding: 'utf8' };

let globalCSS = fs.readFileSync(GLOBAL_STYLES_FILENAME, READING_OPTIONS);

// TODO: Get body with from JSON rather than markup
// TODO: Migrate other schedules over

clearDistAndRebuildEmptyDirs();

fs.readdirSync(SRC_DIR).forEach(filename => {
    let htmlSourceContents = getHtmlContents(filename);
    let renderedHTMLWithCSS = applyCssStyles(htmlSourceContents, globalCSS);
    writeFile(filename, renderedHTMLWithCSS);

    let pngFilename = getPngFilename(filename);
    let bodyWidth = getBodyWidth(htmlSourceContents);
    let imgCSS = bodyWidth ? globalCSS + bodyWidth : globalCSS;
    imgCSS += getBodyStylesForScreenshot();

    nodeHtmlToImage({ output: IMG_DIR + pngFilename, html: applyCssStyles(htmlSourceContents, imgCSS) })
        .then(() => console.log(`Image: ${pngFilename} was created successfully!`));
});

// TODO: Migrate all stuff to JSON
function getPngFilename(filename) {
    if (filename.endsWith(".json")) {
        return filename.replace('.json', '') + '.png';
    } else {
        return filename.replace('.html', '') + '.png';
    }
}

// TODO: Migrate all stuff to JSON
function getHtmlContents(filename) {
    if (filename.endsWith(".json")) {
        let contents = JSON.parse(fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS));
        return createContainer(contents);
    } else {
        return fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS);
    }
}

// TODO: Migrate all stuff to JSON
function writeFile(filename, renderedHTMLWithCSS) {
    // Write schedule to disk with styles
    if (filename.endsWith(".json")) {
        fs.writeFileSync(`${DIST_DIR}${filename.replace('json', 'html')}`, renderedHTMLWithCSS);
    } else {
        fs.writeFileSync(`${DIST_DIR}${filename}`, renderedHTMLWithCSS);
    }
}

function createContainer({ times }) {
    return `
<div class="code-container">
    <!-- BODY-1200 -->
    <style>
        <%- CSS_STYLES %>
    </style>
    <table class="schedule-table">
        ${renderColGroup(times)}
        ${renderHeaders(times)}
        ${renderClasses(times)}
    </table>
</div>
`;
}

function renderColGroup(times) {
    return `
<colgroup>
    <col style="width: 70px">
    ${getAllDays({times}).map(() => `<col style="width: 155px">`).join('\n')}
</colgroup>
    `;
}

function renderHeaders(times) {
    return `
<tr>
    <th></th>
    ${getAllDays({times}).map((day) => `<th class="header">${day}</th>`).join('\n\t')}
</tr>
    `;
}

function getClassForContentCell(classHere, day) {
    if (classHere.tags) {
        return classHere.tags.days.includes(day) ? classHere.tags.tag : "";
    }
}

function trimTimePeriod(name) {
    return name.replace(/[ap]m/g, '');
}

function getRowSpan(classHere) {
    return classHere.rowspan ? `rowspan="${classHere.rowspan}"` : '';
}

function renderClasses(times) {
    const allDays = getAllDays({times});
    return times.map(time => `
<tr class="thick">
    <td class="time-cell">${time.name}</td>
    ${allDays.map((day) => {
        const classHere = getClassOnDay(time.classes, day);
        if (classHere) {
            let arr = [...classHere.label]
            arr.push(`${trimTimePeriod( time.name )}-${classHere.endtime}`);
            return `<td class="content-cell ${getClassForContentCell(classHere, day)}" ${getRowSpan(classHere)}>${arr.join('<br>')}</td>`
        } else {
            return `<td class="content-cell"></td>`;
        }
    }).join('\n')}
</tr>
`).join('\n');
}

function getClassOnDay(classArray, day) {
    return classArray.reduce((acc, curr) =>
            acc ? acc : curr.days.includes(day) ? curr : false,
        false);
}

function getAllDays({ times }) {
    let allDays = times.reduce((acc, curr) => {
        let classDays = curr.classes.reduce((acc2, curr2) => {
            return new Set([...acc2, ...curr2.days]);
        }, []);

        return [...acc, ...classDays];
    }, []);

    const SORTED_LIST = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
    return [...new Set(allDays)].sort((a, b) => {
        return SORTED_LIST.indexOf(a) > SORTED_LIST.indexOf(b) ? 1 : -1;
    });
}

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

module.exports = {
    createContainer
}