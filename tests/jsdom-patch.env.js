const Environment = require("jest-environment-jsdom");

/**
 * A custom environment to set the TextEncoder/TextDecoder that is required by JSDOM
 * see: https://github.com/jsdom/jsdom/issues/2524
 */
module.exports = class JsdomPatch extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === "undefined") {
            const { TextEncoder, TextDecoder } = require("util");
            this.global.TextEncoder = TextEncoder;
            this.global.TextDecoder = TextDecoder;
        }
    }
};
