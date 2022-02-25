import { ScheduleConfig } from "./types";

export const FairviewSchedule: ScheduleConfig = {
    distFilename: "fairview_schedule.html",
    bodyWidth: "1200",
    times: {
        "6:15pm": {
            classes: [
                {
                    label: ["Kid's BJJ"],
                    days: ["MON", "TUES", "WED", "THUR"],
                    endtime: "7:00pm",
                },
            ],
        },
        "7:00pm": {
            classes: [
                {
                    stretch: 2,
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
        "7:30pm": {
            classes: [
                {
                    stretch: 2,
                    label: ["Adult BJJ Fundamentals"],
                    days: ["WED"],
                    endtime: "8:30pm",
                },
            ],
        },
        "8:00pm": {
            classes: [],
        },
    },
};
