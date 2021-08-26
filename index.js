const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");

const DIST_DIR = "./dist/schedule/";
const IMG_DIR = "./dist/img/";
const SRC_DIR = "./src/schedule/";
const GLOBAL_STYLES_FILENAME = "./global_styles.css";
const READING_OPTIONS = { encoding: "utf8" };
const DEFAULT_SORTED_LIST = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

let globalCSS = fs.readFileSync(GLOBAL_STYLES_FILENAME, READING_OPTIONS);

// TODO: Split functions into modules?

clearDistAndRebuildEmptyDirs();

fs.readdirSync(SRC_DIR).forEach((filename) => {
    let contents = JSON.parse(
        fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS)
    );

    // TODO: Still pretty ugly. Let's define this on all schedules.
    if (!contents.sortedList) {
        contents.sortedList = DEFAULT_SORTED_LIST;
    }

    const tableHtmlContent = getTableHtmlContent(contents);
    const renderWithCss = createTableContainer(tableHtmlContent);
    writeHtmlToDisk(filename, renderWithCss(globalCSS));

    let pngFilename = filename.replace(".json", "") + ".png";
    nodeHtmlToImage({
        output: IMG_DIR + pngFilename,
        html: renderWithCss(getImgCss(globalCSS, contents)),
    }).then(() =>
        console.log(`Image: ${pngFilename} was created successfully!`)
    );
});

// Write schedule to disk with styles
function writeHtmlToDisk(filename, renderedHTMLWithCSS) {
    let saveFilename = `${DIST_DIR}${filename.replace("json", "html")}`;
    fs.writeFileSync(saveFilename, renderedHTMLWithCSS);
}

function getTableHtmlContent(contents) {
    return `
        <table class="schedule-table">
            ${renderColGroup(contents)}
            ${renderHeaders(contents)}
            ${renderClasses(contents)}
        </table>`;
}

// Note it's a curried function
function createTableContainer(tableHtmlContent) {
    return (cssStyles) => `
        <div class="code-container">
            <style>
                ${cssStyles}
            </style>
            ${tableHtmlContent}
        </div>`;
}

function renderColGroup(contents) {
    return `
        <!-- Used to define the widths of the columns -->
        <colgroup>
            <col style="width: 70px">
            ${getAllDays(contents)
                .map(() => `<col style="width: 155px">`)
                .join("\n")}
        </colgroup>`;
}

function renderHeaders(contents) {
    return `
        <tr>
            <th></th>
            ${getAllDays(contents)
                .map((day) => `<th class="header">${day}</th>`)
                .join("\n\t")}
        </tr>`;
}

function getClassForContentCell(classHere, day) {
    if (classHere.tags) {
        return classHere.tags.days.includes(day) ? classHere.tags.tag : "";
    } else {
        return "";
    }
}

function trimTimePeriod(name) {
    return name.replace(/[ap]m/g, "");
}

function getRowSpan(classHere) {
    return classHere.rowspan ? `rowspan="${classHere.rowspan}"` : "";
}

function renderClasses({ thick, times, sortedList }) {
    let rowspanTracker = {};
    const allDays = getAllDays({ times, sortedList });
    return times
        .map(
            (time) =>
                `
    <tr ${thick ? `class="thick"` : ""}>
        <td class="time-cell">${time.name}</td>
        ${allDays
            .map((day) => {
                if (rowspanTracker[day]) {
                    rowspanTracker[day]--;
                    return "";
                }
                const classHere = getClassOnDay(time.classes, day);
                if (classHere) {
                    let { rowspan } = classHere;
                    if (rowspan) {
                        // TODO: Make this property something like "additionalRows" rather than rowspan?
                        let number = parseInt(rowspan) - 1;
                        rowspanTracker[day] =
                            rowspanTracker[day] === undefined
                                ? number
                                : rowspanTracker[day] + number;
                    }
                    let arr = [...classHere.label];
                    let name = classHere.nameOverride
                        ? classHere.nameOverride
                        : time.name;
                    arr.push(`${trimTimePeriod(name)}-${classHere.endtime}`);
                    return `<td class="content-cell ${getClassForContentCell(
                        classHere,
                        day
                    )}" ${getRowSpan(classHere)}>${arr.join("<br>")}</td>`;
                } else {
                    // TODO: Add a comment in the empty cell for what day / time is empty
                    return `<td class="content-cell"></td>`;
                }
            })
            .filter(Boolean) // Don't include empty rows
            .join("\n")}
    </tr>
    `
        )
        .join("\n");
}

function getClassOnDay(classArray, day) {
    return classArray.reduce(
        (acc, curr) => (acc ? acc : curr.days.includes(day) ? curr : false),
        false
    );
}

function getAllDays({ times, sortedList }) {
    let allDaysWithDupes = times.reduce((acc, curr) => {
        let allClassDays = curr.classes.reduce(
            (acc2, curr2) => [...acc2, ...curr2.days],
            []
        );
        return [...acc, ...allClassDays];
    }, []);

    return [...new Set(allDaysWithDupes)].sort((a, b) => {
        return sortedList.indexOf(a) > sortedList.indexOf(b) ? 1 : -1;
    });
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
    getAllDays,
};
