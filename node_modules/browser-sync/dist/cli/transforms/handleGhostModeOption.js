"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGhostModeOption = void 0;
const immutable_1 = require("immutable");
function handleGhostModeOption(incoming) {
    const value = incoming.get("ghostMode");
    var trueAll = {
        clicks: true,
        scroll: true,
        forms: {
            submit: true,
            inputs: true,
            toggles: true
        }
    };
    var falseAll = {
        clicks: false,
        scroll: false,
        forms: {
            submit: false,
            inputs: false,
            toggles: false
        }
    };
    if (value === false || value === "false") {
        return [incoming.set("ghostMode", (0, immutable_1.fromJS)(falseAll)), []];
    }
    if (value === true || value === "true") {
        return [incoming.set("ghostMode", (0, immutable_1.fromJS)(trueAll)), []];
    }
    if (value.get("forms") === false) {
        return [
            incoming.set("ghostMode", value.withMutations(function (map) {
                map.set("forms", (0, immutable_1.fromJS)({
                    submit: false,
                    inputs: false,
                    toggles: false
                }));
            })),
            []
        ];
    }
    if (value.get("forms") === true) {
        return [
            incoming.set("ghostMode", value.withMutations(function (map) {
                map.set("forms", (0, immutable_1.fromJS)({
                    submit: true,
                    inputs: true,
                    toggles: true
                }));
            })),
            []
        ];
    }
    return [incoming, []];
}
exports.handleGhostModeOption = handleGhostModeOption;
//# sourceMappingURL=handleGhostModeOption.js.map