const fs = require("fs");
const { createContainer } = require("../index");
const assert = require("assert").strict;

const DIST_DIR = "./dist/schedule/";
const SRC_DIR = "./src/schedule/";
const GLOBAL_STYLES_FILENAME = "./global_styles.css";
const READING_OPTIONS = { encoding: "utf8" };

let globalCSS = fs.readFileSync(GLOBAL_STYLES_FILENAME, READING_OPTIONS);

fs.readdirSync(DIST_DIR).forEach((filename) => {
    let builtHTMLFile = fs.readFileSync(
        `${DIST_DIR}${filename}`,
        READING_OPTIONS
    );

    assert(
        builtHTMLFile.includes(globalCSS),
        `${filename} should contain global css styles. Did you forget to build?`
    );
});

fs.readdirSync(SRC_DIR).forEach((filename) => {
    let srcHTMLFile;
    if (filename.endsWith(".json")) {
        let contents = JSON.parse(
            fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS)
        );
        srcHTMLFile = createContainer(contents);
    } else {
        srcHTMLFile = fs.readFileSync(`${SRC_DIR}${filename}`, READING_OPTIONS);
    }

    assert(
        srcHTMLFile.includes("<%- CSS_STYLES %>"),
        `src file: (${filename}) should contain CSS_STYLE placeholder`
    );
});

console.log("All tests passed successfully!");
