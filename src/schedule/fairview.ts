import { Schedule } from "./types";

export const FairviewSchedule: Schedule = {
    distFilename: "fairview_schedule.html",
    bodyWidth: "1200",
    times: [
        {
            name: "6:15pm",
            classes: [
                {
                    label: ["Kid's BJJ"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "7:00pm",
                },
            ],
        },
        {
            name: "7:00pm",
            classes: [
                {
                    rowspan: 2,
                    label: ["Adult BJJ Fundamentals"],
                    days: ["MON", "TUES", "THUR"],
                    endtime: "8:00pm",
                },
                {
                    label: ["BJJ Drills"],
                    days: ["WED"],
                    endtime: "7:30pm",
                },
            ],
        },
        {
            name: "7:30pm",
            classes: [
                {
                    rowspan: 2,
                    label: ["Adult BJJ Fundamentals"],
                    days: ["WED"],
                    endtime: "8:30pm",
                },
            ],
        },
        {
            name: "8:00pm",
            classes: [],
        },
    ],
};
