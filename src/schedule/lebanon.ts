import { Schedule } from "./types";

export const LebanonSchedule: Schedule = {
    distFilename: "lebanon_schedule.html",
    bodyWidth: "1500",
    times: [
        {
            name: "9:00am",
            classes: [
                {
                    label: ["Fundamental / Intermediate"],
                    days: ["MON", "WED", "FRI"],
                    endtime: "10:00am",
                },
            ],
        },
        {
            name: "11:00am",
            classes: [
                {
                    label: ["Little Dragons"],
                    days: ["SAT"],
                    endtime: "12:00pm",
                },
            ],
        },
        {
            name: "12:00pm",
            classes: [
                {
                    label: ["Open Mat"],
                    days: ["SAT"],
                    endtime: "1:00pm",
                },
            ],
        },
        {
            name: "5:00pm",
            classes: [
                {
                    label: ["Little Dragons"],
                    days: ["MON", "TUES", "WED", "THUR", "FRI"],
                    endtime: "5:30pm",
                },
            ],
        },
        {
            name: "5:30pm",
            classes: [
                {
                    rowspan: 2,
                    label: ["Little Dragons"],
                    days: ["MON", "TUES", "WED", "THUR", "FRI"],
                    endtime: "6:30pm",
                    tags: {
                        days: ["TUES", "THUR"],
                        tag: "nogi",
                    },
                },
            ],
        },
        {
            name: "6:30pm",
            classes: [],
        },
        {
            name: "6:45pm",
            classes: [
                {
                    label: ["Fundamental / Intermediate"],
                    days: ["MON", "WED", "FRI"],
                    endtime: "7:45pm",
                },
                {
                    label: ["Adult Jiu-Jitsu"],
                    days: ["TUES", "THUR"],
                    endtime: "7:45pm",
                    tags: {
                        days: ["TUES", "THUR"],
                        tag: "nogi",
                    },
                },
            ],
        },
        {
            name: "8:00pm",
            classes: [
                {
                    label: ["Advanced / Competition Team"],
                    days: ["MON", "WED"],
                    endtime: "9:00pm",
                },
            ],
        },
    ],
};
