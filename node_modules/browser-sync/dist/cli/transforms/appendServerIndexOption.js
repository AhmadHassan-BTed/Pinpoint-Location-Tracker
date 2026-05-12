"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendServerIndexOption = void 0;
function appendServerIndexOption(incoming) {
    if (!incoming.get("server"))
        return [incoming, []];
    const value = incoming.get("index");
    if (value) {
        return [incoming.setIn(["server", "index"], value), []];
    }
    return [incoming, []];
}
exports.appendServerIndexOption = appendServerIndexOption;
//# sourceMappingURL=appendServerIndexOption.js.map