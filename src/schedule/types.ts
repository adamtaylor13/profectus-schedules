type Day =
    | "MON"
    | "TUES"
    | "WED"
    | "THUR"
    | "FRI"
    | "SAT"
    | "SUN"
    | "Monday - Friday"
    | "Every Day";

// Vertical styling that correspond with a CSS class
// ex. <td class="nogi" />
type Tag = "nogi" | "both";

type ClassTime = {
    label: string[];
    days: Day[];
    endtime: string;
    nameOverride?: string;
    rowspan?: number;
    tags?: {
        days: Day[];
        tag: Tag;
    };
};

type ClassDef = {
    name: string;
    classes: ClassTime[];
};

export type Schedule = {
    distFilename: string; // The resulting filename from building the schedule
    bodyWidth: "1200" | "1500" | "1600"; // Does this need to be defined? Can it just be a string?
    thick?: boolean;
    times: ClassDef[];
    bottomContent?: string; // Notes at the bottom of the schedule
    sortedList?: Day[]; // Change the ordering of the days from standard layout
};
