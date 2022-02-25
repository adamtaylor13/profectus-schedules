import { ScheduleConfig } from "./schedule";
import { DayMap, ClassColumn, TimeMap } from "./schedule/types";

export const orderBySortedList = (sortedList) => (a, b) => {
    return sortedList.indexOf(a) > sortedList.indexOf(b) ? 1 : -1;
};

export const timeSort = (a, b) => {
    return (
        Date.parse("1970/01/01 " + a.slice(0, -2) + " " + a.slice(-2)) -
        Date.parse("1970/01/01 " + b.slice(0, -2) + " " + b.slice(-2))
    );
};

export function forEachClass(
    scheduleConfig: ScheduleConfig,
    doThing: (classColumn: ClassColumn) => void
) {
    for (const time of Object.typedKeys(scheduleConfig.times)) {
        const { classes } = scheduleConfig.times[time];
        for (const clazz of classes) {
            let { days, ...classRest } = clazz;
            for (const day of days) {
                const classColumn = {
                    ...classRest,
                    simultaneousTimeHash: day.hashCode() + time.hashCode(),
                    day,
                    time,
                    type: "CLASS" as const,
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
        const { day, time } = robustClass;
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
            dayMap[day][time] = [withSpan];
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
        const { day, time } = robustClass;
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
            timeMap[time][day] = [withSpan];
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
