import { ScheduleConfig } from "./types";

/**
 * Previous schedule: <script data-schedule-location="columbia" crossorigin="https://cdn.jsdelivr.net" type="application/javascript" src="https://cdn.jsdelivr.net/gh/adamtaylor13/profectus-schedules/schedules.js"></script>
 * New Schedule in Beta: <script data-schedule-location="columbia"
                             data-branch="beta"
                             crossorigin="https://cdn.jsdelivr.net"
                             type="application/javascript"
                             src="https://cdn.jsdelivr.net/gh/adamtaylor13/profectus-schedules@1e19bff0c50a31398af23f678be558df7b9d2c3a/schedules.js"></script>
 */

export const ColumbiaSchedule = {
    distFilename: "columbia_schedule.html",
    bodyWidth: "2400",
    thick: true,
    maxSimultaneousClasses: 2,
    mobileFirst: true,
    days: {
        MON: {
            "6:00am": {
                label: ["All Levels"],
                end: "7:00am",
                tags: ["Adult", "Mat 1"],
            },
            "12:00pm": {
                label: ["All Levels"],
                end: "1:00pm",
                tags: ["Adult", "Mat 1", "nogi"],
            },
        },
        TUES: {
            "6:00am": {
                label: ["All Levels"],
                end: "7:00am",
                tags: ["Adult", "Mat 1"],
            },
            "12:00pm": {
                label: ["All Levels"],
                end: "1:00pm",
                tags: ["Adult", "Mat 1"],
            },
        },
        WED: {
            "6:00am": {
                label: ["All Levels"],
                end: "7:00am",
                tags: ["Adult", "Mat 1"],
            },
        },
        THUR: {
            "6:00am": {
                label: ["All Levels"],
                end: "7:00am",
                tags: ["Adult", "Mat 1"],
            },
        },
        FRI: {
            "6:00am": {
                label: ["Live Training"],
                end: "7:00am",
                tags: ["Adult", "Mat 1"],
            },
        },
    },
};
