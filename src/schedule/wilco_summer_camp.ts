import { ScheduleConfig } from "./types";

export const WilcoSummerCampSchedule: ScheduleConfig = {
    distFilename: "wilco_summer_camp_schedule.html",
    bodyWidth: "1500",
    bottomContent:
        "*Field Trip Form Attached; Destination suject to change.\nSpecial T-shirts provided for Field Trip Day.",
    times: [
        {
            name: "6:30",
            classes: [
                {
                    label: ["Drop Off", "Breakfast", "Tech Time"],
                    days: ["Every Day"],
                    endtime: "8:00am",
                },
            ],
        },
        {
            name: "8:00",
            classes: [
                {
                    label: ["Jiu-Jitsu Class"],
                    days: ["Every Day"],
                    endtime: "9:00",
                },
            ],
        },
        {
            name: "9:00",
            classes: [
                {
                    label: ["Snack Time"],
                    days: ["Every Day"],
                    endtime: "9:30",
                },
            ],
        },
        {
            name: "9:30",
            classes: [
                {
                    label: ["Planned Activity"],
                    days: ["Every Day"],
                    endtime: "11:00",
                },
            ],
        },
        {
            name: "11:00",
            classes: [
                {
                    label: ["Lunch"],
                    days: ["Every Day"],
                    endtime: "12:00",
                },
            ],
        },
        {
            name: "12:00",
            classes: [
                {
                    label: ["Move Time / Rest"],
                    days: ["Every Day"],
                    endtime: "2:00",
                },
            ],
        },
        {
            name: "1:00",
            classes: [
                {
                    label: ["Field Trips*"],
                    days: ["THUR"],
                    endtime: "4:00",
                },
            ],
        },
        {
            name: "2:00",
            classes: [
                {
                    label: ["Free Time"],
                    days: ["Every Day"],
                    endtime: "3:30",
                },
            ],
        },
        {
            name: "3:30",
            classes: [
                {
                    label: ["Clean Up"],
                    days: ["Every Day"],
                    endtime: "4:00",
                },
            ],
        },
        {
            name: "4:00",
            classes: [
                {
                    label: ["Tech Time"],
                    days: ["Every Day"],
                    endtime: "5:00",
                },
            ],
        },
        {
            name: "5:00",
            classes: [
                {
                    label: ["Jiu-Jitsu Class"],
                    days: ["Every Day"],
                    endtime: "6:30",
                },
            ],
        },
    ],
};
