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
    sortedList: ["MON", "TUES", "WED", "THUR", "FRI", "SAT"],
    times: {
        "6:00am": {
            classes: [
                {
                    label: ["All Levels", "Adult", "Mat 1"],
                    days: ["TUES", "THUR"],
                    endtime: "7:00am",
                    tags: {
                        days: ["TUES", "THUR"],
                        tag: "gi",
                    },
                },
                {
                    label: ["Drilling & Live Training", "Adult", "Mat 1"],
                    days: ["WED"],
                    endtime: "7:00am",
                    tags: {
                        days: ["WED"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Open Mat", "Adult", "Mat 1"],
                    days: ["FRI"],
                    endtime: "7:00am",
                    tags: {
                        days: ["FRI"],
                        tag: "both",
                    },
                },
            ],
        },
        "9:00am": {
            classes: [
                {
                    label: ["Judo Class"],
                    days: ["SAT"],
                    endtime: "10:00am",
                    tags: {
                        days: ["SAT"],
                        tag: "gi",
                    },
                },
            ],
        },
        "10:00am": {
            classes: [
                {
                    label: ["Open Mat", "Jiu-Jitsu"],
                    days: ["SAT"],
                    endtime: "11:00am",
                    tags: {
                        days: ["SAT"],
                        tag: "both",
                    },
                },
            ],
        },
        "12:00pm": {
            classes: [
                {
                    label: ["Adult", "All Levels", "Mat 1"],
                    days: ["MON"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["MON"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Adult", "All Levels", "Mat 1"],
                    days: ["TUES", "WED", "FRI"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["TUES", "WED", "FRI"],
                        tag: "gi",
                    },
                },
                {
                    label: ["Adult", "Live Training", "Mat 1"],
                    days: ["THUR"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["THUR"],
                        tag: "gi",
                    },
                },
            ],
        },
        "5:00pm": {
            classes: [
                {
                    label: ["Kids 1", "(3-5 years)", "Mat 1"],
                    days: ["MON", "TUES", "WED"],
                    endtime: "5:30pm",
                    tags: {
                        days: ["MON", "TUES", "WED"],
                        tag: "gi",
                    },
                },
                {
                    label: ["Kids 1", "(3-5 years)", "Mat 1"],
                    days: ["THUR"],
                    endtime: "5:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Kids 3", "(9-14 years)", "Mat 2"],
                    days: ["MON", "TUES", "WED"],
                    endtime: "5:30pm",
                    tags: {
                        days: ["MON", "TUES", "WED"],
                        tag: "gi",
                    },
                },
                {
                    label: ["Kids 3", "(9-14 years)", "Mat 2"],
                    days: ["THUR"],
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
                    days: ["MON", "TUES", "WED"],
                    endtime: "6:10pm",
                    tags: {
                        days: ["MON", "TUES", "WED"],
                        tag: "gi",
                    },
                },
                {
                    label: ["Kids 2", "(6-8 years)", "Mat 1"],
                    days: ["THUR"],
                    endtime: "6:10pm",
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
                    tags: {
                        days: ["FRI"],
                        tag: "both",
                    },
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
                    tags: {
                        days: ["MON", "WED"],
                        tag: "gi",
                    },
                },
                {
                    stretch: 2,
                    label: ["Gi Intermediate", "Adult", "Mat 2"],
                    days: ["MON", "WED"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["MON", "WED"],
                        tag: "gi",
                    },
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
                    tags: {
                        days: ["TUES"],
                        tag: "gi",
                    },
                },
            ],
        },
        "7:00pm": {
            classes: [
                {
                    label: [""],
                    days: ["MON", "TUES", "WED", "THUR", "FRI", "SAT"],
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
