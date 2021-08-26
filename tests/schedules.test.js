/**
 * @jest-environment ./tests/jsdom-patch.env.js
 */

const JSDOM_OPTIONS = {
    resources: "usable",
    runScripts: "dangerously",
};

beforeAll(() => {
    // Note: Necessary due to limitations with JSDOM
    global.setImmediate = global.setTimeout;
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    global.JSDOM = JSDOM;
});

test("it renders HTML Schedule on screens larger than 1000", async () => {
    let dom = await JSDOM.fromFile("./test_browser_code.html", JSDOM_OPTIONS);
    expect(dom.window.outerWidth).toBe(1024);

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener(
            "proceed-with-test-conditions",
            (foo) => {
                try {
                    let actual =
                        dom.window.document.querySelector(".code-container");
                    expect(actual).not.toBeNull();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }
        );
    });
});

test("it renders IMG Schedule on screens smaller than 1000", async () => {
    let dom = await JSDOM.fromFile("./test_browser_code.html", JSDOM_OPTIONS);
    dom.window.outerWidth = 900;

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener(
            "proceed-with-test-conditions",
            (foo) => {
                try {
                    let actual = dom.window.document.querySelector("img");
                    expect(actual).not.toBeNull();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }
        );
    });
});
