import { ScheduleConfig } from "./types";

export const ColumbiaSchedule: ScheduleConfig = {
    distFilename: "columbia_schedule.html",
    bodyWidth: "2400",
    thick: true,
    invert: true,
    maxSimultaneousClasses: 2,
    times: {
        "6:00am": {
            classes: [
                {
                    label: ["All Levels", "Jiu-Jitsu"],
                    days: ["TUES", "THUR"],
                    endtime: "7:00am",
                },
                {
                    label: ["Open Mat"],
                    days: ["WED"],
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
                    label: ["All Levels", "Jiu-Jitsu"],
                    days: ["MON", "TUES", "WED", "FRI"],
                    endtime: "1:00pm",
                    tags: {
                        days: ["MON"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Open Mat", "Jiu-Jitsu"],
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
                    days: ["MON", "WED"],
                    endtime: "6:00pm",
                },
                {
                    label: ["Kids 3", "(9-14 years)", "Mat 2"],
                    days: ["MON", "WED"],
                    endtime: "6:00pm",
                },
            ],
        },
        "5:30pm": {
            classes: [],
        },
        "6:00pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Drilling"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "6:30pm",
                },
            ],
        },
        "6:15pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Open Mat", "Jiu-Jitsu"],
                    days: ["FRI"],
                    endtime: "7:15pm",
                },
            ],
        },
        "6:30pm": {
            classes: [
                {
                    label: ["Gi Beginner", "Adult / Teen", "Mat 1"],
                    days: ["MON", "WED"],
                    endtime: "7:30pm",
                },
                {
                    label: ["Gi Intermediate", "Adult", "Mat 2"],
                    days: ["MON", "WED"],
                    endtime: "7:30pm",
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
