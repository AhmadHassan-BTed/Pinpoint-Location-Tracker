"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleExtensionsOption = void 0;
const immutable_1 = require("immutable");
const cli_options_1 = require("../cli-options");
const _ = require("../../lodash.custom");
function handleExtensionsOption(incoming) {
    const value = incoming.get("extensions");
    if (_.isString(value)) {
        const split = (0, cli_options_1.explodeFilesArg)(value);
        if (split.length) {
            return [incoming.set("extensions", (0, immutable_1.List)(split)), []];
        }
    }
    if (immutable_1.List.isList(value)) {
        return [incoming.set("extensions", value), []];
    }
    return [incoming, []];
}
exports.handleExtensionsOption = handleExtensionsOption;
//# sourceMappingURL=handleExtensionsOption.js.map