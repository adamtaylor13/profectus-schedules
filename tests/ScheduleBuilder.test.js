const { CssGenerator } = require("../CssGenerator");
const { ScheduleBuilder } = require("../ScheduleBuilder");

const MOCK_CONFIG = {
    bodyWidth: "808",
    sortedList: ["FRI", "MON", "WED", "TUES", "THUR", "SAT", "SUN"],
    times: [
        {
            name: "foo",
            classes: [
                {
                    rowspan: "2",
                    label: ["FOO LABEL"],
                    days: ["MON", "TUES"],
                    endtime: "whenever",
                },
                {
                    nameOverride: "kuzco",
                    label: ["FOO 2 LABEL"],
                    days: ["WED"],
                    endtime: "you want",
                },
            ],
        },
        {
            name: "bar",
            classes: [
                {
                    label: ["BAR LABEL"],
                    days: ["MON", "TUES", "THUR", "FRI"],
                    endtime: "today?",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
            ],
        },
    ],
};

test("it sets a default sorted list", () => {
    const schedule = new ScheduleBuilder({});
    expect(schedule.config.sortedList).toEqual([
        "SUN",
        "MON",
        "TUES",
        "WED",
        "THUR",
        "FRI",
        "SAT",
    ]);
});

test("it recursively gets and sorts all days within a times structure", () => {
    const schedule = new ScheduleBuilder(MOCK_CONFIG);
    expect(schedule.allSortedDays()).toEqual([
        "FRI",
        "MON",
        "WED",
        "TUES",
        "THUR",
    ]);
});

test("it throws if you haven't run the necessary generations first", () => {
    const schedule = new ScheduleBuilder(MOCK_CONFIG);

    expect(() => schedule.generateTableHtmlContent()).toThrow();
    schedule.generateColGroup();
    expect(() => schedule.generateTableHtmlContent()).toThrow();
    schedule.generateHeaders();
    expect(() => schedule.generateTableHtmlContent()).toThrow();
    schedule.generateScheduleRows();
    expect(() => schedule.generateTableHtmlContent()).not.toThrow();
});

test("it throws with no bodyWidth", () => {
    let mockCopy = JSON.parse(JSON.stringify(MOCK_CONFIG));
    delete mockCopy.bodyWidth;

    const schedule = new ScheduleBuilder(mockCopy, new CssGenerator())
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent();

    expect(() => schedule.renderForImg()).toThrow();
});

test("it generates full table html for web", () => {
    const schedule = new ScheduleBuilder(MOCK_CONFIG, new CssGenerator())
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent()
        .renderForWeb();

    expect(schedule).toMatchInlineSnapshot(`
"
        <div class=\\"code-container\\">
            <style>
                .code-container {
    overflow-x:auto;
}
/* On screens that are 1150px or more, make the schedule easier to read by making it wider */
@media screen and (min-width: 1150px) {
    .code-container {
        margin-right: -120px;
        margin-left: -120px;
    }
}
/* Screens smaller than 600px */
@media screen and (max-width: 600px) {
    .schedule-table {
        border-spacing: 2px !important;
    }
}
.schedule-table {
    position: relative;
    border-collapse: separate;
    border-spacing: 20px;
    empty-cells: hide;
    table-layout: fixed;

    border-color: #ccc;
    width: 898px;
    margin: 0 auto;
    line-height: 1.1em;
}
.schedule-table::before {
    content: \\"\\";
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    background-image: url(https://static1.squarespace.com/static/5bb5b6b0fd67935469274c58/5fd155e7ce71ee580f9a9df1/5fee595c634c4829a85d6357/1609455968245/F7BA5FCB-764B-4F44-82FB-5F442B0E8E7B.jpg?format=2500w);
    background-repeat: no-repeat;
    background-size: cover;
    filter: contrast(0.125);
}
.schedule-table td, .schedule-table th {
    font-family: Arial, sans-serif;
    font-size: 14px;
    padding: 10px 5px;
    overflow: hidden;
    word-break: normal;
    position: relative;
}
.content-cell {
    text-align: center;
    background-color: rgba(255,255,255,0.42);
}
.content-cell.nogi {
    padding-left: 23px;
}
.header {
    font-weight: bold;
    text-align: center;
    vertical-align: top;
    background-color: #f0f0f0;
}
.content-cell, .time-cell {
    border-color: transparent !important;
    color: ghostwhite !important;
}
.time-cell {
    background-color: transparent;
    text-align: center;
    font-weight: bold;
}
.nogi {
    position: relative;
}
.nogi::before {
    content: \\" \\";
    position: absolute;
    background: tomato;
    left: 0;
    width: 20px;
    top: 0;
    bottom: 0;
}
.nogi::after {
    content: \\"NO-GI\\";
    position: absolute;
    left: -10px;
    top: 50%;
    transform: rotate(270deg) translateX(20%);
    font-size: 14px !important;
}
tr.thick {
    height: 125px;
}
tr.thick > .content-cell {
    font-size: 1.2rem !important;
    line-height: 1.4rem;
}

            </style>
            
        <table class=\\"schedule-table\\">
            
        <!-- Used to define the widths of the columns -->
        <colgroup>
            <col style=\\"width: 70px\\">
            <col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
        </colgroup>
            
        <tr>
            <th></th>
            <th class=\\"header\\">FRI</th>
	<th class=\\"header\\">MON</th>
	<th class=\\"header\\">WED</th>
	<th class=\\"header\\">TUES</th>
	<th class=\\"header\\">THUR</th>
        </tr>
            
    <tr >
        <td class=\\"time-cell\\">foo</td>
        <td class=\\"content-cell\\"></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">FOO LABEL<br>foo-whenever</td>
<td class=\\"content-cell \\" >FOO 2 LABEL<br>kuzco-you want</td>
<td class=\\"content-cell \\" rowspan=\\"2\\">FOO LABEL<br>foo-whenever</td>
<td class=\\"content-cell\\"></td>
    </tr>
    

    <tr >
        <td class=\\"time-cell\\">bar</td>
        <td class=\\"content-cell \\" >BAR LABEL<br>bar-today?</td>
<td class=\\"content-cell\\"></td>
<td class=\\"content-cell nogi\\" >BAR LABEL<br>bar-today?</td>
    </tr>
    
        </table>
        </div>"
`);
});

test("it generates full table html for img", () => {
    const schedule = new ScheduleBuilder(MOCK_CONFIG, new CssGenerator())
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent()
        .renderForImg();

    expect(schedule).toMatchInlineSnapshot(`
"
        <div class=\\"code-container\\">
            <style>
                
            .code-container {
    overflow-x:auto;
}
/* On screens that are 1150px or more, make the schedule easier to read by making it wider */
@media screen and (min-width: 1150px) {
    .code-container {
        margin-right: -120px;
        margin-left: -120px;
    }
}
/* Screens smaller than 600px */
@media screen and (max-width: 600px) {
    .schedule-table {
        border-spacing: 2px !important;
    }
}
.schedule-table {
    position: relative;
    border-collapse: separate;
    border-spacing: 20px;
    empty-cells: hide;
    table-layout: fixed;

    border-color: #ccc;
    width: 898px;
    margin: 0 auto;
    line-height: 1.1em;
}
.schedule-table::before {
    content: \\"\\";
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    background-image: url(https://static1.squarespace.com/static/5bb5b6b0fd67935469274c58/5fd155e7ce71ee580f9a9df1/5fee595c634c4829a85d6357/1609455968245/F7BA5FCB-764B-4F44-82FB-5F442B0E8E7B.jpg?format=2500w);
    background-repeat: no-repeat;
    background-size: cover;
    filter: contrast(0.125);
}
.schedule-table td, .schedule-table th {
    font-family: Arial, sans-serif;
    font-size: 14px;
    padding: 10px 5px;
    overflow: hidden;
    word-break: normal;
    position: relative;
}
.content-cell {
    text-align: center;
    background-color: rgba(255,255,255,0.42);
}
.content-cell.nogi {
    padding-left: 23px;
}
.header {
    font-weight: bold;
    text-align: center;
    vertical-align: top;
    background-color: #f0f0f0;
}
.content-cell, .time-cell {
    border-color: transparent !important;
    color: ghostwhite !important;
}
.time-cell {
    background-color: transparent;
    text-align: center;
    font-weight: bold;
}
.nogi {
    position: relative;
}
.nogi::before {
    content: \\" \\";
    position: absolute;
    background: tomato;
    left: 0;
    width: 20px;
    top: 0;
    bottom: 0;
}
.nogi::after {
    content: \\"NO-GI\\";
    position: absolute;
    left: -10px;
    top: 50%;
    transform: rotate(270deg) translateX(20%);
    font-size: 14px !important;
}
tr.thick {
    height: 125px;
}
tr.thick > .content-cell {
    font-size: 1.2rem !important;
    line-height: 1.4rem;
}

            body { 
                width: 808px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 850px;
            }
            .code-container {
                margin: 0 !important;
                overflow-x: unset !important;
            }
            </style>
            
        <table class=\\"schedule-table\\">
            
        <!-- Used to define the widths of the columns -->
        <colgroup>
            <col style=\\"width: 70px\\">
            <col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
<col style=\\"width: 155px\\">
        </colgroup>
            
        <tr>
            <th></th>
            <th class=\\"header\\">FRI</th>
	<th class=\\"header\\">MON</th>
	<th class=\\"header\\">WED</th>
	<th class=\\"header\\">TUES</th>
	<th class=\\"header\\">THUR</th>
        </tr>
            
    <tr >
        <td class=\\"time-cell\\">foo</td>
        <td class=\\"content-cell\\"></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">FOO LABEL<br>foo-whenever</td>
<td class=\\"content-cell \\" >FOO 2 LABEL<br>kuzco-you want</td>
<td class=\\"content-cell \\" rowspan=\\"2\\">FOO LABEL<br>foo-whenever</td>
<td class=\\"content-cell\\"></td>
    </tr>
    

    <tr >
        <td class=\\"time-cell\\">bar</td>
        <td class=\\"content-cell \\" >BAR LABEL<br>bar-today?</td>
<td class=\\"content-cell\\"></td>
<td class=\\"content-cell nogi\\" >BAR LABEL<br>bar-today?</td>
    </tr>
    
        </table>
        </div>"
`);
});
