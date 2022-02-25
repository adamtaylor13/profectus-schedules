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

type TimeSuffix = "am" | "pm";
type QuarterTime = "00" | "15" | "30" | "45";
type Hour =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
export type Time = `${Hour}:${QuarterTime}${TimeSuffix}`;

export type ScheduleConfig = {
    distFilename: string; // The resulting filename from building the schedule
    bodyWidth: "1200" | "1500" | "1600" | "2400"; // Does this need to be defined? Can it just be a string?
    thick?: boolean;
    invert?: boolean; // Swap the x/y axes
    times: {
        [key in Time]?: {
            classes: ClassTime[];
        };
    };
    bottomContent?: string; // Notes at the bottom of the schedule
    sortedList?: Day[]; // Change the ordering of the days from standard layout
    maxSimultaneousClasses?: number;
};

export type Col = {
    label?: string[];
    type: ColType;
};

export type Row = {
    rowKey: string;
    rowType: "class" | "overlap";
    cols: Array<Array<Col>>;
};

export type ColType = "class" | "EMPTY" | "NULL";

// TODO: rename this garbage
export type RobustClassTime = Omit<ClassTime, "days"> & {
    type: ColType;
    simultaneousTimeHash: number; // The number that, should it match, indicates a class is at the same time as another class
    day: Day;
    time: Time;
    span?: number;
    spanProp?: `rowspan="${number}"`;
};

export type DayMap = {
    [key in Day]?: {
        [key in Time]?: RobustClassTime[];
    };
};

export type TimeMap = {
    [key in Time]?: {
        [key in Day]?: RobustClassTime[];
    };
};
