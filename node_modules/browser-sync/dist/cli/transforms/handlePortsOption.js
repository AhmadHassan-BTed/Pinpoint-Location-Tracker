"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePortsOption = void 0;
const immutable_1 = require("immutable");
function handlePortsOption(incoming) {
    const value = incoming.get("ports");
    if (!value)
        return [incoming, []];
    const obj = { min: null, max: null };
    if (typeof value === "string") {
        if (~value.indexOf(",")) {
            const segs = value.split(",");
            obj.min = parseInt(segs[0], 10);
            obj.max = parseInt(segs[1], 10);
        }
        else {
            obj.min = parseInt(value, 10);
            obj.max = null;
        }
    }
    else {
        obj.min = value.get("min");
        obj.max = value.get("max") || null;
    }
    return [incoming.set("ports", (0, immutable_1.Map)(obj)), []];
}
exports.handlePortsOption = handlePortsOption;
//# sourceMappingURL=handlePortsOption.js.map