import { ScheduleConfig } from "./types";

export const ColumbiaSchedule: ScheduleConfig = {
    distFilename: "columbia_schedule.html",
    bodyWidth: "1600",
    thick: true,
    times: [
        {
            name: "6:00am",
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
        {
            name: "9:00am",
            classes: [
                {
                    label: ["Judo Class"],
                    days: ["SAT"],
                    endtime: "10:00am",
                },
            ],
        },
        {
            name: "10:00am",
            classes: [
                {
                    label: ["Open Mat", "Jiu-Jitsu"],
                    days: ["SAT"],
                    endtime: "11:00am",
                },
            ],
        },
        {
            name: "12:00pm",
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
        {
            name: "1:00pm",
            classes: [
                {
                    label: ["Open Mat"],
                    days: ["SUN"],
                    endtime: "2:00pm",
                },
            ],
        },
        {
            name: "5:00pm",
            classes: [
                {
                    nameOverride: "5:30pm",
                    rowspan: 2,
                    label: [
                        "Big Kids",
                        "5:00-5:55pm",
                        "",
                        "---",
                        "",
                        "Little Kids",
                    ],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "5:55pm",
                },
            ],
        },
        {
            name: "5:30pm",
            classes: [],
        },
        {
            name: "6:00pm",
            classes: [
                {
                    label: ["Drilling"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "6:30pm",
                },
            ],
        },
        {
            name: "6:15pm",
            classes: [
                {
                    rowspan: 2,
                    label: ["Open Mat", "Jiu-Jitsu"],
                    days: ["FRI"],
                    endtime: "7:15pm",
                },
            ],
        },
        {
            name: "6:30pm",
            classes: [
                {
                    label: ["All Levels", "Jiu-Jitsu"],
                    days: ["MON", "TUES", "THUR"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Advanced/Drilling"],
                    days: ["WED"],
                    endtime: "7:30pm",
                },
            ],
        },
        {
            name: "7:30pm",
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
    ],
};
