import { ScheduleConfig } from "./types";

export const WilcoAfterSchoolSchedule: ScheduleConfig = {
    distFilename: "wilco_after_school_program_schedule.html",
    bodyWidth: "1500",
    times: [
        {
            name: "2:30pm",
            classes: [
                {
                    label: ["After-School Pick up route"],
                    days: ["Monday - Friday"],
                    endtime: "3:30",
                },
            ],
        },
        {
            name: "3:30pm",
            classes: [
                {
                    label: ["After-School Jiu-Jitsu Class"],
                    days: ["Monday - Friday"],
                    endtime: "4:00",
                },
            ],
        },
        {
            name: "4:00pm",
            classes: [
                {
                    label: ["Free Time"],
                    days: ["Monday - Friday"],
                    endtime: "5:00",
                },
            ],
        },
        {
            name: "5:00pm",
            classes: [
                {
                    label: [
                        "Little Dragons - Kids Jiu-Jitsu",
                        "(Ages 6 and under)",
                    ],
                    days: ["Monday - Friday"],
                    endtime: "5:30",
                },
            ],
        },
        {
            name: "5:30pm",
            classes: [
                {
                    label: ["Little Dragons - Kids Jiu-Jitsu", "(Ages 7-12)"],
                    days: ["Monday - Friday"],
                    endtime: "6:30",
                },
            ],
        },
    ],
};
