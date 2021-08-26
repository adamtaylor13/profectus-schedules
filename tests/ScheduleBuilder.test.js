const { ScheduleBuilder } = require("../ScheduleBuilder");

const MOCK_CONFIG = {
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

test("it generates full table html", () => {
    const schedule = new ScheduleBuilder(MOCK_CONFIG)
        .generateColGroup()
        .generateHeaders()
        .generateScheduleRows()
        .generateTableHtmlContent()
        .renderWithCss("foobar");

    expect(schedule).toMatchInlineSnapshot(`
"
        <div class=\\"code-container\\">
            <style>
                foobar
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
