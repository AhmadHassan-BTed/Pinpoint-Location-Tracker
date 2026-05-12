"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDefaultIgnorePatterns = void 0;
const immutable_1 = require("immutable");
const defaultIgnorePatterns = [
    /node_modules/,
    /bower_components/,
    ".sass-cache",
    ".vscode",
    ".git",
    ".idea"
];
function addDefaultIgnorePatterns(incoming) {
    if (!incoming.get("watch")) {
        return [incoming, []];
    }
    const output = incoming.update("watchOptions", watchOptions => {
        const userIgnored = (0, immutable_1.List)([])
            .concat(watchOptions.get("ignored"))
            .filter(Boolean)
            .toSet();
        const merged = userIgnored.merge(defaultIgnorePatterns);
        return watchOptions.merge({
            ignored: merged.toList()
        });
    });
    return [output, []];
}
exports.addDefaultIgnorePatterns = addDefaultIgnorePatterns;
//# sourceMappingURL=addDefaultIgnorePatterns.js.map