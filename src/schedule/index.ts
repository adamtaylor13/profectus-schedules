import { ColumbiaSchedule } from "./columbia";
import { BrentwoodSchedule } from "./brentwood";
import { FairviewSchedule } from "./fairview";
import { LebanonSchedule } from "./lebanon";
import { WilcoAfterSchoolSchedule } from "./wilco_after_school";
import { WilcoSummerCampSchedule } from "./wilco_summer_camp";
import { Schedule, Day } from "./types";

export { Schedule, Day };
export default [
    BrentwoodSchedule,
    ColumbiaSchedule,
    FairviewSchedule,
    LebanonSchedule,
    WilcoAfterSchoolSchedule,
    WilcoSummerCampSchedule,
];
