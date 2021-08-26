const fs = require("fs");

class CssGenerator {
    READING_OPTIONS = { encoding: "utf8" };
    GLOBAL_STYLES_FILENAME = "./global_styles.css";

    GLOBAL_CSS;

    constructor() {
        this.GLOBAL_CSS = fs.readFileSync(
            this.GLOBAL_STYLES_FILENAME,
            this.READING_OPTIONS
        );
    }

    cssForSite() {
        return this.GLOBAL_CSS;
    }

    cssForImg(bodyWidth) {
        if (!bodyWidth) {
            throw new Error("Must supply a bodyWidth");
        }

        return `
            ${this.GLOBAL_CSS}
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
            }`;
    }
}

module.exports = { CssGenerator };
