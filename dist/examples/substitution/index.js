"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArbitraryClassThatUsesSorter {
    constructor(sorter) {
        this.sorter = sorter;
    }
    sort(input) {
        return this.sorter.sort(input);
    }
}
exports.default = ArbitraryClassThatUsesSorter;
