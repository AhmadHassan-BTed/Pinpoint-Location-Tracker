"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCwdToWatchOptions = void 0;
function addCwdToWatchOptions(incoming) {
    const output = incoming.updateIn(["watchOptions", "cwd"], watchCwd => {
        return watchCwd || incoming.get("cwd");
    });
    return [output, []];
}
exports.addCwdToWatchOptions = addCwdToWatchOptions;
//# sourceMappingURL=addCwdToWatchOptions.js.map