const { getAllDays } = require("../index");

test("recursively get all days within a times structure", () => {
    const complexStructure = {
        sortedList: ["FRI", "MON", "WED", "TUES", "THUR", "SAT", "SUN"],
        times: [
            {
                name: "foo",
                classes: [
                    {
                        days: ["MON", "TUES"],
                    },
                    {
                        days: ["WED"],
                    },
                ],
            },
            {
                name: "bar",
                classes: [
                    {
                        days: ["MON", "TUES", "THUR", "FRI"],
                    },
                ],
            },
        ],
    };

    const allDays = getAllDays(complexStructure);
    expect(allDays).toEqual(["FRI", "MON", "WED", "TUES", "THUR"]);
});
