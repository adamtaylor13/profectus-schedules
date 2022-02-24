export const orderBySortedList = (sortedList) => (a, b) => {
    return sortedList.indexOf(a) > sortedList.indexOf(b) ? 1 : -1;
};

export const timeSort = (a, b) => {
    return (
        Date.parse("1970/01/01 " + a.slice(0, -2) + " " + a.slice(-2)) -
        Date.parse("1970/01/01 " + b.slice(0, -2) + " " + b.slice(-2))
    );
};
