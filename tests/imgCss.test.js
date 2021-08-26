const { getImgCss } = require("../index");

test("returns globalCss with img-specific css", () => {
    const imgCss = getImgCss("foo", { bodyWidth: 200 });
    expect(imgCss).toContain(`
    foo
    body { 
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 850px;
    }
    .code-container {
        margin: 0 !important;
        overflow-x: unset !important;
    }
    `);
});
test("throws if no bodyWidth supplied", () => {
    expect(() => getImgCss("foo", {})).toThrow();
});
