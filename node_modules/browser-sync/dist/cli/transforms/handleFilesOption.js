"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFilesOption = void 0;
const immutable_1 = require("immutable");
const cli_options_1 = require("../cli-options");
function handleFilesOption(incoming) {
    const value = incoming.get("files");
    const namespaces = {
        core: {
            globs: [],
            objs: []
        }
    };
    const processed = (0, cli_options_1.makeFilesArg)(value);
    if (processed.globs.length) {
        namespaces.core.globs = processed.globs;
    }
    if (processed.objs.length) {
        namespaces.core.objs = processed.objs;
    }
    return [incoming.set("files", (0, immutable_1.fromJS)(namespaces)), []];
}
exports.handleFilesOption = handleFilesOption;
//# sourceMappingURL=handleFilesOption.js.map