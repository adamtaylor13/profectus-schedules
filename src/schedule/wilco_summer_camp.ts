import { ScheduleConfig } from "./types";

export const WilcoSummerCampSchedule: ScheduleConfig = {
    distFilename: "wilco_summer_camp_schedule.html",
    bodyWidth: "1500",
    bottomContent:
        "*Field Trip Form Attached; Destination suject to change.\nSpecial T-shirts provided for Field Trip Day.",
    times: {
         "6:30am":{
            classes: [
                {
                    label: ["Drop Off", "Breakfast", "Tech Time"],
                    days: ["Monday - Friday"],
                    endtime: "8:00am",
                },
            ],
        },
         "8:00am":{
            classes: [
                {
                    label: ["Jiu-Jitsu Class"],
                    days: ["Monday - Friday"],
                    endtime: "9:00",
                },
            ],
        },
         "9:00am":{
            classes: [
                {
                    label: ["Snack Time"],
                    days: ["Monday - Friday"],
                    endtime: "9:30",
                },
            ],
        },
         "9:30am":{
            classes: [
                {
                    label: ["Planned Activity"],
                    days: ["Monday - Friday"],
                    endtime: "11:00",
                },
            ],
        },
         "11:00am":{
            classes: [
                {
                    label: ["Lunch"],
                    days: ["Monday - Friday"],
                    endtime: "12:00",
                },
            ],
        },
         "12:00pm":{
            classes: [
                {
                    label: ["Move Time / Rest"],
                    days: ["Monday - Friday"],
                    endtime: "2:00",
                },
            ],
        },
         "1:00pm":{
            classes: [
                {
                    label: ["Field Trips*"],
                    days: ["THUR"],
                    endtime: "4:00",
                },
            ],
        },
         "2:00pm":{
            classes: [
                {
                    label: ["Free Time"],
                    days: ["Monday - Friday"],
                    endtime: "3:30",
                },
            ],
        },
         "3:30pm":{
            classes: [
                {
                    label: ["Clean Up"],
                    days: ["Monday - Friday"],
                    endtime: "4:00",
                },
            ],
        },
         "4:00pm":{
            classes: [
                {
                    label: ["Tech Time"],
                    days: ["Monday - Friday"],
                    endtime: "5:00",
                },
            ],
        },
         "5:00pm":{
            classes: [
                {
                    label: ["Jiu-Jitsu Class"],
                    days: ["Monday - Friday"],
                    endtime: "6:30",
                },
            ],
        },
    }
};
