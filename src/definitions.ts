declare interface String {
    hashCode(): number;
}

declare interface Object {
    typedKeys<T>(input: T): Array<keyof T>;
}

// Stolen: https://stackoverflow.com/a/7616484/6535053
String.prototype.hashCode = function () {
    var hash = 0,
        i,
        chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

Object.prototype.typedKeys = function (input) {
    return Object.keys(input) as Array<keyof typeof input>;
};
