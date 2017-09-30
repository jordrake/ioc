"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tape");
const container_1 = require("../../container");
const index_1 = require("./index");
const regular_sorter_1 = require("./regular-sorter");
const reverse_sorter_1 = require("./reverse-sorter");
test("substition example should sort alphabetically if regular sorter is provided", (t) => {
    t.plan(1);
    const container = new container_1.default();
    container.registerClass("sorter", [], regular_sorter_1.default);
    container.registerClass("arby", ["sorter"], index_1.default);
    const actual = container.execute(["arby"], (arby) => {
        return arby.sort(["hello", "my", "name", "is", "jordan"]);
    });
    t.deepEqual(actual, ["hello", "is", "jordan", "my", "name"]);
});
test("substition example should sort reverse alphabetically if reverse sorter is provided", (t) => {
    t.plan(1);
    const container = new container_1.default();
    container.registerClass("sorter", [], reverse_sorter_1.default);
    container.registerClass("arby", ["sorter"], index_1.default);
    const actual = container.execute(["arby"], (arby) => {
        return arby.sort(["hello", "my", "name", "is", "jordan"]);
    });
    t.deepEqual(actual, ["name", "my", "jordan", "is", "hello"]);
});
