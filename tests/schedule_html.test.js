const fs = require("fs");
const assert = require("assert").strict;

const DIST_DIR = "./dist/schedule/";
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

console.log("All tests passed successfully!");
