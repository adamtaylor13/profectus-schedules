import { ScheduleConfig } from "./types";

export const BrentwoodSchedule: ScheduleConfig = {
    distFilename: "brentwood_schedule.html",
    bodyWidth: "1500",
    sortedList: ["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"],
    bottomContent: "*Call ahead due to irregular bi-weekly schedule",
    times: {
        "6:00am": {
            classes: [
                {
                    label: ["All Levels"],
                    days: ["MON", "WED", "FRI"],
                    endtime: "7:00am",
                    tags: {
                        days: ["FRI"],
                        tag: "nogi",
                    },
                },
            ],
        },
        "7:00am": {
            classes: [
                {
                    label: [""],
                    days: ["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"],
                    endtime: "",
                },
            ],
        },
        "10:00am": {
            classes: [
                {
                    stretch: 2,
                    label: ["Yoga"],
                    days: ["SAT"],
                    endtime: "11:00am",
                },
            ],
        },
        "10:30am": {
            classes: [
                {
                    stretch: 2,
                    label: ["L.E.O. Training"],
                    days: ["TUES"],
                    endtime: "11:30am",
                    tags: {
                        days: ["TUES"],
                        tag: "nogi",
                    },
                },
            ],
        },
        "11:00am": {
            classes: [
                {
                    stretch: 3,
                    label: ["Open Mat"],
                    days: ["SAT"],
                    endtime: "1:00pm",
                },
            ],
        },
        "11:30am": {
            classes: [],
        },
        "12:00pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Competition Live Training"],
                    days: ["TUES", "THUR"],
                    endtime: "1:30pm",
                    tags: {
                        days: ["TUES"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["All Levels"],
                    days: ["MON", "WED"],
                    endtime: "1:00pm",
                },
                {
                    label: ["Drilling Class"],
                    days: ["FRI"],
                    endtime: "1:00pm",
                },
                {
                    stretch: 2,
                    label: ["All Levels"],
                    days: ["SUN"],
                    endtime: "2:00pm",
                },
            ],
        },
        "1:00pm": {
            classes: [
                {
                    label: ["Live Training"],
                    days: ["MON", "WED", "FRI"],
                    endtime: "1:45pm",
                },
            ],
        },
        "2:00pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Yoga"],
                    days: ["SUN"],
                    endtime: "3:00pm",
                },
            ],
        },
        "3:00pm": {
            classes: [
                {
                    label: [""],
                    days: ["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"],
                    endtime: "",
                },
            ],
        },
        "4:30pm": {
            classes: [
                {
                    label: ["Little Gorillas"],
                    days: ["TUES", "THUR"],
                    endtime: "5:00pm",
                },
            ],
        },
        "5:00pm": {
            classes: [
                {
                    label: ["Big Gorillas"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "6:00pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
                },
                {
                    label: ["Women's Competition Class*"],
                    days: ["FRI"],
                    endtime: "6:00pm",
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
        "6:15pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["All Levels /", "Fundamentals"],
                    days: ["MON", "WED"],
                    endtime: "7:15pm",
                },
                {
                    stretch: 3,
                    label: ["All Levels"],
                    days: ["TUES"],
                    endtime: "7:30pm",
                    tags: {
                        days: ["TUES"],
                        tag: "nogi",
                    },
                },
                {
                    stretch: 2,
                    label: ["Fundamentals"],
                    days: ["THUR"],
                    endtime: "7:15pm",
                    tags: {
                        days: ["THUR"],
                        tag: "nogi",
                    },
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
        "7:15pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Jiu Jitsu Practice"],
                    days: ["MON", "WED"],
                    endtime: "8:15pm",
                },
                {
                    stretch: 2,
                    label: ["Open Mat"],
                    days: ["THUR"],
                    endtime: "9:00pm",
                },
            ],
        },
        "7:30pm": {
            classes: [
                {
                    label: ["Drilling Class"],
                    days: ["TUES"],
                    endtime: "8:30pm",
                },
            ],
        },
    },
};
