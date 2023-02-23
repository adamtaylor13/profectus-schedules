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
    sortedList: ["MON", "TUES", "WED", "THUR", "FRI"],
    times: {
        "6:00am": {
            classes: [
                {
                    label: ["Wrestling", "Adult / Teen", "Mat 1"],
                    days: ["TUES"],
                    endtime: "7:00am",
                    tags: {
                        days: ["TUES"],
                        tag: "wrestling",
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
                    days: ["THUR"],
                    endtime: "7:00am",
                    tags: {
                        days: ["THUR"],
                        tag: "both",
                    },
                },
                {
                    label: ["All Levels", "Adult", "Mat 1"],
                    days: ["FRI"],
                    endtime: "7:00am",
                    tags: {
                        days: ["FRI"],
                        tag: "gi",
                    },
                },
            ],
        },
        "12:00pm": {
            classes: [
                {
                    label: ["All Levels", "Adult", "Mat 1"],
                    days: ["MON"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["MON"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["All Levels", "Adult / Teen", "Mat 1"],
                    days: ["WED"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["WED"],
                        tag: "gi",
                    },
                },
                {
                    label: ["All Levels", "Adult", "Mat 1"],
                    days: ["FRI"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["FRI"],
                        tag: "gi",
                    },
                },
            ],
        },
        "3:00pm": {
            classes: [
                {
                    label: ["Open Mat"],
                    days: ["SUN"],
                    endtime: "4:30pm",
                    tags: {
                        days: ["SUN"],
                        tag: "both",
                    },
                },
            ],
        },
        "5:00pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Kids 1", "(3-5 years)", "Mat 1"],
                    days: ["MON", "TUES", "WED"],
                    endtime: "5:30pm",
                    tags: {
                        days: ["MON", "TUES", "WED"],
                        tag: "gi",
                    },
                },
                {
                    stretch: 2,
                    label: ["Kids 1", "(3-5 years)", "Mat 1"],
                    days: ["THUR"],
                    endtime: "5:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
                {
                    stretch: 3,
                    label: ["Kids 3", "(9-14 years)", "Mat 2"],
                    days: ["MON", "WED"],
                    endtime: "6:00pm",
                    tags: {
                        days: ["MON", "WED"],
                        tag: "gi",
                    },
                },
                {
                    stretch: 3,
                    label: ["Kids 3", "(9-14 years)", "Mat 2"],
                    days: ["TUES"],
                    endtime: "6:00pm",
                    tags: {
                        days: ["TUES"],
                        tag: "nogi",
                    },
                },
                {
                    stretch: 3,
                    label: ["Kids 3", "(9-14 years)", "Mat 2"],
                    days: ["THUR"],
                    endtime: "6:00pm",
                    tags: {
                        days: ["THUR"],
                        tag: "wrestling",
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
                    label: [""],
                    days: ["MON", "TUES", "WED", "THUR", "FRI"],
                    endtime: "",
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
                    label: [""],
                    days: ["MON", "TUES", "WED", "THUR", "FRI"],
                    endtime: "",
                },
            ],
        },
        "6:30pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Gi Beginner", "Adult / Teen", "Mat 1"],
                    days: ["MON", "TUES", "WED"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["MON", "TUES", "WED"],
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
                    label: ["Wrestlebox", "Adult / Teen", "Mat 1"],
                    days: ["THUR"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "wrestling",
                    },
                },
                {
                    stretch: 2,
                    label: ["Women's Class", "Adult / Teen", "Mat 2"],
                    days: ["THUR"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "gi",
                    },
                },
            ],
        },
        "7:00pm": {
            classes: [
                {
                    label: [""],
                    days: ["MON", "TUES", "WED", "THUR", "FRI"],
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
