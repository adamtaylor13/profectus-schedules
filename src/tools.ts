import { Day, ScheduleConfig } from "./schedule";
import { DayMap, ClassColumn, TimeMap, ClassTime } from "./schedule/types";

export const orderBySortedList = (sortedList) => (a, b) => {
    return sortedList.indexOf(a) > sortedList.indexOf(b) ? 1 : -1;
};

export const timeSort = (a, b) => {
    return (
        Date.parse("1970/01/01 " + a.slice(0, -2) + " " + a.slice(-2)) -
        Date.parse("1970/01/01 " + b.slice(0, -2) + " " + b.slice(-2))
    );
};

/**
 * For classes with a custom "stretch" property, we need to account for how
 * many rows they will cross. The easiest way to do that is to inject a NULL
 * into the very next block that a class will occupy. This is the next
 * timeblock-same day. Normal schedules, this is the next row, for inverted
 * schedules it's the very next <td>.
 */
function injectNullBlockForStretch(
    classRest: Omit<ClassTime, "days">,
    index: number,
    scheduleConfig: ScheduleConfig,
    day: Day,
    doThing: (classColumn: ClassColumn) => void
) {
    let numStretch = classRest.stretch - 1; // TODO: This may cause off-by-one-errors later. By default EVERY block occupies at least 1
    let iKeeper = index;
    while (numStretch > 0) {
        let nextTimePeriod = Object.typedKeys(scheduleConfig.times)[
            iKeeper + 1
        ];
        let nullInsertedClass = {
            ...classRest,
            simultaneousTimeHash:
                day.hashCode() + nextTimePeriod.hashCode() + "NULL".hashCode(),
            day,
            time: nextTimePeriod,
            type: "NULL" as const,
        };
        doThing(nullInsertedClass);
        ++iKeeper;
        --numStretch;
    }
}

export function forEachClass(
    scheduleConfig: ScheduleConfig,
    doThing: (classColumn: ClassColumn) => void
) {
    for (let i = 0; i < Object.typedKeys(scheduleConfig.times).length; i++) {
        const time = Object.typedKeys(scheduleConfig.times)[i];
        const { classes } = scheduleConfig.times[time];
        for (const clazz of classes) {
            let { days, ...classRest } = clazz;
            for (const day of days) {
                let type = classRest.label[0]
                    ? ("CLASS" as const)
                    : ("NULL" as const);

                // TODO: What about inverted schedules?
                if (classRest.stretch && !scheduleConfig.invert) {
                    injectNullBlockForStretch(
                        classRest,
                        i,
                        scheduleConfig,
                        day,
                        doThing
                    );
                }

                const classColumn = {
                    ...classRest,
                    simultaneousTimeHash: day.hashCode() + time.hashCode(),
                    day,
                    time,
                    type: type,
                };
                doThing(classColumn);
            }
        }
    }
}

// TODO: These can be abstracted down further into a single function
export function generateDayMap(
    scheduleConfig: ScheduleConfig,
    collisionMap,
    maxNumClasses
) {
    let dayMap: DayMap = {};
    forEachClass(scheduleConfig, (robustClass) => {
        const { day, time, type } = robustClass;
        if (!dayMap[day]) {
            dayMap[day] = {};
        }
        let alreadyExists = dayMap[day][time];

        let span =
            maxNumClasses /
            (collisionMap[robustClass.simultaneousTimeHash] ?? 1);
        let withSpan = { ...robustClass, span };

        if (alreadyExists) {
            dayMap[day][time].push(withSpan);
        } else {
            if (type === "NULL") {
                dayMap[day][time] = [{ type: "NULL" }];
            } else {
                dayMap[day][time] = [withSpan];
            }
        }
    });

    // dayMap.inspect("DayMap");

    return dayMap;
}

export function generateTimeMap(
    scheduleConfig: ScheduleConfig,
    collisionMap,
    maxNumSimultaneousClasses
) {
    let timeMap: TimeMap = {};
    forEachClass(scheduleConfig, (robustClass) => {
        const { day, time, type } = robustClass;
        if (!timeMap[time]) {
            timeMap[time] = {};
        }
        let alreadyExists = timeMap[time][day];

        let span =
            maxNumSimultaneousClasses /
            (collisionMap[robustClass.simultaneousTimeHash] ?? 1);
        let withSpan = { ...robustClass, span };

        if (alreadyExists) {
            timeMap[time][day].push(withSpan);
        } else {
            if (type === "NULL") {
                timeMap[time][day] = [{ type: "NULL" }];
            } else {
                timeMap[time][day] = [withSpan];
            }
        }
    });

    // timeMap.inspect("timeMap");

    return timeMap;
}

export function getCollisionMap(scheduleConfig: ScheduleConfig) {
    let collisions: { [key in string]: number } = {};
    forEachClass(scheduleConfig, (robustClass) => {
        let collision = collisions[robustClass.simultaneousTimeHash];
        collisions[robustClass.simultaneousTimeHash] = collision
            ? collision + 1
            : 1;
    });

    let length = Object.keys(collisions).length;
    for (let i = 0; i < length; i++) {
        let hash = Object.keys(collisions)[i];
        if (collisions[hash] === 1) {
            delete collisions[hash];
            i = 0;
            length = Object.keys(collisions).length;
        }
    }

    return collisions;
}

export function getMaxSimultaneousClasses(collisionMap) {
    return Object.keys(collisionMap).reduce(
        (highestNumber, hashKey) =>
            Math.max(highestNumber, collisionMap[hashKey]),
        1
    );
}
