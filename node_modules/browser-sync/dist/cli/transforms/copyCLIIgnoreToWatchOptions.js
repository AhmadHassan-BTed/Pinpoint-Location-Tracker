"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyCLIIgnoreToWatchOptions = void 0;
const immutable_1 = require("immutable");
function copyCLIIgnoreToWatchOptions(incoming) {
    if (!incoming.get("ignore")) {
        return [incoming, []];
    }
    const output = incoming.updateIn(["watchOptions", "ignored"], (0, immutable_1.List)([]), ignored => {
        return (0, immutable_1.List)([]).concat(ignored, incoming.get("ignore"));
    });
    return [output, []];
}
exports.copyCLIIgnoreToWatchOptions = copyCLIIgnoreToWatchOptions;
//# sourceMappingURL=copyCLIIgnoreToWatchOptions.js.map