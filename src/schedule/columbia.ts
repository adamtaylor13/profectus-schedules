import { ScheduleConfig } from "./types";

/**
 * Previous schedule: <script data-schedule-location="columbia" crossorigin="https://cdn.jsdelivr.net" type="application/javascript" src="https://cdn.jsdelivr.net/gh/adamtaylor13/profectus-schedules/schedules.js"></script>
 * New Schedule in Beta: <script data-schedule-location="columbia"
                             data-branch="beta"
                             crossorigin="https://cdn.jsdelivr.net"
                             type="application/javascript"
                             src="https://cdn.jsdelivr.net/gh/adamtaylor13/profectus-schedules@1e19bff0c50a31398af23f678be558df7b9d2c3a/schedules.js"></script>
 */

export const ColumbiaSchedule: ScheduleConfig = {
    distFilename: "columbia_schedule.html",
    bodyWidth: "2400",
    thick: true,
    maxSimultaneousClasses: 2,
    mobileFirst: true,
    times: {
        "6:00am": {
            classes: [
                {
                    label: ["All Levels", "Adult", "Mat 1"],
                    days: ["TUES", "WED", "THUR"],
                    endtime: "7:00am",
                },
                {
                    label: ["Live Training", "Adult", "Mat 1"],
                    days: ["FRI"],
                    endtime: "7:00am",
                },
            ],
        },
        "9:00am": {
            classes: [
                {
                    label: ["Judo Class"],
                    days: ["SAT"],
                    endtime: "10:00am",
                },
            ],
        },
        "10:00am": {
            classes: [
                {
                    label: ["Open Mat", "Jiu-Jitsu"],
                    days: ["SAT"],
                    endtime: "11:00am",
                },
            ],
        },
        "12:00pm": {
            classes: [
                {
                    label: ["Adult", "All Levels", "Mat 1"],
                    days: ["MON", "TUES", "WED", "FRI"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["MON"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Adult", "Live Training", "Mat 1"],
                    days: ["THUR"],
                    endtime: "1:00pm",
                },
            ],
        },
        "1:00pm": {
            classes: [
                {
                    label: ["Open Mat"],
                    days: ["SUN"],
                    endtime: "2:00pm",
                },
            ],
        },
        "5:00pm": {
            classes: [
                {
                    label: ["Kids 1", "(3-5 years)", "Mat 1"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "5:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Kids 3", "(9-14 years)", "Mat 2"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "5:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
            ],
        },
        "5:30pm": {
            classes: [],
        },
        "5:40pm": {
            classes: [
                {
                    label: ["Kids 2", "(6-8 years)", "Mat 1"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "6:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
            ],
        },
        "6:00pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Open Mat"],
                    days: ["FRI"],
                    endtime: "7:00pm",
                },
            ],
        },
        "6:30pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Gi Beginner", "Adult / Teen", "Mat 1"],
                    days: ["MON", "WED"],
                    endtime: "7:30pm",
                },
                {
                    stretch: 2,
                    label: ["Gi Intermediate", "Adult", "Mat 2"],
                    days: ["MON", "WED"],
                    endtime: "7:30pm",
                },
                {
                    stretch: 2,
                    label: ["NoGi", "All Levels", "Adult / Teen", "Mat 2"],
                    days: ["TUES"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["TUES"],
                        tag: "nogi",
                    },
                },
                {
                    stretch: 2,
                    label: ["NoGi", "All Levels", "Adult / Teen", "Mat 1"],
                    days: ["THUR"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
                {
                    stretch: 2,
                    label: ["Women's Class", "Adult / Teen", "Mat 1"],
                    days: ["TUES"],
                    endtime: "7:30pm",
                },
            ],
        },
        "7:00pm": {
            classes: [
                {
                    label: [""],
                    days: ["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"],
                    endtime: "",
                },
            ],
        },
        "7:30pm": {
            classes: [
                {
                    label: ["Live Training"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "8:15pm",
                    tags: {
                        days: ["MON", "TUES", "WED", "THUR"],
                        tag: "both",
                    },
                },
            ],
        },
    },
};
