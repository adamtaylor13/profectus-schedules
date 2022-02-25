import "../src/definitions";
import ScheduleBuilder from "../src/ScheduleBuilder";
import CssGenerator from "../src/CssGenerator";
import { ColumbiaSchedule } from "../src/schedule/columbia";
import {
    generateDayMap,
    generateTimeMap,
    getCollisionMap,
    getMaxSimultaneousClasses,
} from "../src/tools";
import { DayMap, TimeMap } from "../src/schedule/types";

test("Baseline Columbia non-inverted HTML", () => {
    const scheduleConfig = ColumbiaSchedule;
    scheduleConfig.invert = false;
    const collisions = getCollisionMap(scheduleConfig);
    const maxNumSimultaneousClasses = getMaxSimultaneousClasses(collisions);
    const dayMap: DayMap = generateDayMap(
        scheduleConfig,
        collisions,
        maxNumSimultaneousClasses
    );
    const timeMap: TimeMap = generateTimeMap(
        scheduleConfig,
        collisions,
        maxNumSimultaneousClasses
    );

    const schedule = new ScheduleBuilder({
        scheduleConfig: scheduleConfig,
        dayMap,
        timeMap,
        cssGenerator: new CssGenerator(),
        minColspan: maxNumSimultaneousClasses,
    })
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
.content-cell.nogi, .content-cell.both {
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
.nogi,.both {
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
.both::before {
    content: \\" \\";
    position: absolute;
    background: #4527c9;
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
.both::after {
    content: \\"GI + NO-GI\\";
    position: absolute;
    left: -26px;
    top: 54%;
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
            <col style=\\"width: 125px\\"><col style=\\"width: 125px\\">
<col style=\\"width: 125px\\"><col style=\\"width: 125px\\">
<col style=\\"width: 125px\\"><col style=\\"width: 125px\\">
<col style=\\"width: 125px\\"><col style=\\"width: 125px\\">
<col style=\\"width: 125px\\"><col style=\\"width: 125px\\">
<col style=\\"width: 125px\\"><col style=\\"width: 125px\\">
<col style=\\"width: 125px\\"><col style=\\"width: 125px\\">
        </colgroup>
            
        <tr>
            <th></th>
            <th class=\\"header\\" colspan=\\"2\\">SUN</th>
	<th class=\\"header\\" colspan=\\"2\\">MON</th>
	<th class=\\"header\\" colspan=\\"2\\">TUES</th>
	<th class=\\"header\\" colspan=\\"2\\">WED</th>
	<th class=\\"header\\" colspan=\\"2\\">THUR</th>
	<th class=\\"header\\" colspan=\\"2\\">FRI</th>
	<th class=\\"header\\" colspan=\\"2\\">SAT</th>
        </tr>
            
        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">6:00am</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>6:00-7:00am</td>
<td class=\\"content-cell \\" colspan=\\"2\\">Open Mat<br>6:00-7:00am</td>
<td class=\\"content-cell \\" colspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>6:00-7:00am</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">9:00am</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"2\\">Judo Class<br>9:00-10:00am</td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">10:00am</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"2\\">Open Mat<br>Jiu-Jitsu<br>10:00-11:00am</td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">12:00pm</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell nogi\\" colspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell \\" colspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell \\" colspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell \\" colspan=\\"2\\">Open Mat<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell \\" colspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">1:00pm</td>
            <td class=\\"content-cell \\" colspan=\\"2\\">Open Mat<br>1:00-2:00pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">5:00pm</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"1\\">Kids 1<br>(3-5 years)<br>Mat 1<br>5:00-6:00pm</td>
<td class=\\"content-cell \\" colspan=\\"1\\">Kids 3<br>(9-14 years)<br>Mat 2<br>5:00-6:00pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"1\\">Kids 1<br>(3-5 years)<br>Mat 1<br>5:00-6:00pm</td>
<td class=\\"content-cell \\" colspan=\\"1\\">Kids 3<br>(9-14 years)<br>Mat 2<br>5:00-6:00pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">6:00pm</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell \\" colspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell \\" colspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell \\" colspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">6:15pm</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"2\\">Open Mat<br>Jiu-Jitsu<br>6:15-7:15pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">6:30pm</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"1\\">Gi Beginner<br>Adult / Teen<br>Mat 1<br>6:30-7:30pm</td>
<td class=\\"content-cell \\" colspan=\\"1\\">Gi Intermediate<br>Adult<br>Mat 2<br>6:30-7:30pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" colspan=\\"1\\">Gi Beginner<br>Adult / Teen<br>Mat 1<br>6:30-7:30pm</td>
<td class=\\"content-cell \\" colspan=\\"1\\">Gi Intermediate<br>Adult<br>Mat 2<br>6:30-7:30pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\">7:30pm</td>
            <td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell both\\" colspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
<td class=\\"content-cell both\\" colspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
<td class=\\"content-cell both\\" colspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
<td class=\\"content-cell both\\" colspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" colspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>
            
        </table>
        </div>"
`);
});

test("Baseline Columbia inverted HTML", () => {
    const scheduleConfig = ColumbiaSchedule;
    scheduleConfig.invert = true;
    const collisions = getCollisionMap(scheduleConfig);
    const maxNumSimultaneousClasses = getMaxSimultaneousClasses(collisions);
    const dayMap: DayMap = generateDayMap(
        scheduleConfig,
        collisions,
        maxNumSimultaneousClasses
    );
    const timeMap: TimeMap = generateTimeMap(
        scheduleConfig,
        collisions,
        maxNumSimultaneousClasses
    );

    const schedule = new ScheduleBuilder({
        scheduleConfig: scheduleConfig,
        dayMap,
        timeMap,
        cssGenerator: new CssGenerator(),
        minColspan: maxNumSimultaneousClasses,
    })
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
.content-cell.nogi, .content-cell.both {
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
.nogi,.both {
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
.both::before {
    content: \\" \\";
    position: absolute;
    background: #4527c9;
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
.both::after {
    content: \\"GI + NO-GI\\";
    position: absolute;
    left: -26px;
    top: 54%;
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
            <col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
<col style=\\"width: 250px\\">
        </colgroup>
            
        <tr>
            <th></th>
            <th class=\\"header\\" colspan=\\"1\\">6:00am</th>
	<th class=\\"header\\" colspan=\\"1\\">9:00am</th>
	<th class=\\"header\\" colspan=\\"1\\">10:00am</th>
	<th class=\\"header\\" colspan=\\"1\\">12:00pm</th>
	<th class=\\"header\\" colspan=\\"1\\">1:00pm</th>
	<th class=\\"header\\" colspan=\\"1\\">5:00pm</th>
	<th class=\\"header\\" colspan=\\"1\\">6:00pm</th>
	<th class=\\"header\\" colspan=\\"1\\">6:15pm</th>
	<th class=\\"header\\" colspan=\\"1\\">6:30pm</th>
	<th class=\\"header\\" colspan=\\"1\\">7:30pm</th>
        </tr>
            
        <tr class=\\"thick\\">
            <td class=\\"time-cell\\"rowspan=\\"2\\">SUN</td>
            <td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Open Mat<br>1:00-2:00pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            
            
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\"rowspan=\\"2\\">MON</td>
            <td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell nogi\\" rowspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"1\\">Kids 1<br>(3-5 years)<br>Mat 1<br>5:00-6:00pm</td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"1\\">Gi Beginner<br>Adult / Teen<br>Mat 1<br>6:30-7:30pm</td>
<td class=\\"content-cell both\\" rowspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
        </tr>

        <tr class=\\"thick\\">
            
            <td class=\\"content-cell \\" rowspan=\\"1\\">Kids 3<br>(9-14 years)<br>Mat 2<br>5:00-6:00pm</td>
<td class=\\"content-cell \\" rowspan=\\"1\\">Gi Intermediate<br>Adult<br>Mat 2<br>6:30-7:30pm</td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\"rowspan=\\"2\\">TUES</td>
            <td class=\\"content-cell \\" rowspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>6:00-7:00am</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell both\\" rowspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
        </tr>

        <tr class=\\"thick\\">
            
            
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\"rowspan=\\"2\\">WED</td>
            <td class=\\"content-cell \\" rowspan=\\"2\\">Open Mat<br>6:00-7:00am</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"1\\">Kids 1<br>(3-5 years)<br>Mat 1<br>5:00-6:00pm</td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"1\\">Gi Beginner<br>Adult / Teen<br>Mat 1<br>6:30-7:30pm</td>
<td class=\\"content-cell both\\" rowspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
        </tr>

        <tr class=\\"thick\\">
            
            <td class=\\"content-cell \\" rowspan=\\"1\\">Kids 3<br>(9-14 years)<br>Mat 2<br>5:00-6:00pm</td>
<td class=\\"content-cell \\" rowspan=\\"1\\">Gi Intermediate<br>Adult<br>Mat 2<br>6:30-7:30pm</td>
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\"rowspan=\\"2\\">THUR</td>
            <td class=\\"content-cell \\" rowspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>6:00-7:00am</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Open Mat<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Drilling<br>6:00-6:30pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell both\\" rowspan=\\"2\\">Live Training<br>7:30-8:15pm</td>
        </tr>

        <tr class=\\"thick\\">
            
            
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\"rowspan=\\"2\\">FRI</td>
            <td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">All Levels<br>Jiu-Jitsu<br>12:00-1:00pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Open Mat<br>Jiu-Jitsu<br>6:15-7:15pm</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            
            
        </tr>

        <tr class=\\"thick\\">
            <td class=\\"time-cell\\"rowspan=\\"2\\">SAT</td>
            <td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Judo Class<br>9:00-10:00am</td>
<td class=\\"content-cell \\" rowspan=\\"2\\">Open Mat<br>Jiu-Jitsu<br>10:00-11:00am</td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
<td class=\\"content-cell\\" rowspan=\\"2\\"><!-- undefined @ undefined --></td>
        </tr>

        <tr class=\\"thick\\">
            
            
        </tr>
            
        </table>
        </div>"
`);
});
