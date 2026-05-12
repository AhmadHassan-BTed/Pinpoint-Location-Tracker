"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerOption = void 0;
const immutable_1 = require("immutable");
function handleServerOption(incoming) {
    const value = incoming.get("server");
    if (value === false) {
        return [incoming, []];
    }
    // server: true
    if (value === true) {
        const obj = {
            baseDir: ["./"]
        };
        return [incoming.set("server", (0, immutable_1.fromJS)(obj)), []];
    }
    // server: "./app"
    if (typeof value === "string") {
        const obj = {
            baseDir: [value]
        };
        return [incoming.set("server", (0, immutable_1.fromJS)(obj)), []];
    }
    if (immutable_1.List.isList(value)) {
        const obj = {
            baseDir: value
        };
        return [incoming.set("server", (0, immutable_1.fromJS)(obj)), []];
    }
    if (immutable_1.Map.isMap(value)) {
        const dirs = (0, immutable_1.List)([])
            .concat(value.get("baseDir", "./"))
            .filter(Boolean);
        const merged = value.merge({ baseDir: dirs });
        return [incoming.set("server", merged), []];
    }
    return [incoming, []];
}
exports.handleServerOption = handleServerOption;
//# sourceMappingURL=handleServerOption.js.map