"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendServerDirectoryOption = void 0;
function appendServerDirectoryOption(incoming) {
    if (!incoming.get("server"))
        return [incoming, []];
    if (incoming.get("directory")) {
        return [
            incoming.setIn(["server", "directory"], incoming.has("directory")),
            []
        ];
    }
    return [incoming, []];
}
exports.appendServerDirectoryOption = appendServerDirectoryOption;
//# sourceMappingURL=appendServerDirectoryOption.js.map