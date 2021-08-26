const fs = require("fs");
const Environment = require("jest-environment-jsdom");

/**
 * A custom environment to set the TextEncoder that is required by JSDOM
 */
module.exports = class JsdomPatch extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === "undefined") {
            const { TextEncoder, TextDecoder } = require("util");
            this.global.TextEncoder = TextEncoder;
            this.global.TextDecoder = TextDecoder;
        }
        this.global.fs = fs;
    }
};
