export type Day =
    | "MON"
    | "TUES"
    | "WED"
    | "THUR"
    | "FRI"
    | "SAT"
    | "SUN"
    | "Monday - Friday";

// Vertical styling that correspond with a CSS class
// ex. <td class="nogi" />
type Tag = "nogi" | "both";

export type ClassTime = {
    uuid?: string;
    label: string[];
    days: Day[];
    endtime: string;
    nameOverride?: string;
    stretch?: number; // The number of blocks this schedule should span
    tags?: {
        days: Day[];
        tag: Tag;
    };
};

export type ClassDef = {
    name: string;
    classes: ClassTime[];
};

export type ScheduleConfig = {
    distFilename: string; // The resulting filename from building the schedule
    bodyWidth: "1200" | "1500" | "1600" | "2400"; // Does this need to be defined? Can it just be a string?
    thick?: boolean;
    invert?: boolean; // Swap the x/y axes
    times: ClassDef[];
    bottomContent?: string; // Notes at the bottom of the schedule
    sortedList?: Day[]; // Change the ordering of the days from standard layout
    maxSimultaneousClasses?: number;
};

export type Col = ClassTime;

export type Row = {
    rowKey: string;
    cols: Array<Array<Col>>;
};
