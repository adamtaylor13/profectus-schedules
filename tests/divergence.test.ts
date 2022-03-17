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
import { BrentwoodSchedule } from "../src/schedule/brentwood";
import { LebanonSchedule } from "../src/schedule/lebanon";
import { FairviewSchedule } from "../src/schedule/fairview";

it.each([
    ["Columbia", ColumbiaSchedule],
    ["Brentwood", BrentwoodSchedule],
    ["Lebanon", LebanonSchedule],
    ["Fairview", FairviewSchedule],
])("Baseline %s non-inverted HTML", () => {
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

    expect(schedule).toMatchSnapshot();
});
