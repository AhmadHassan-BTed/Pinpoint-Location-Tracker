"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHostOption = void 0;
const bin_1 = require("../../bin");
function handleHostOption(incoming) {
    const host = incoming.get("host");
    const listen = incoming.get("listen");
    if (host && listen) {
        if (host !== listen) {
            return [
                incoming,
                [
                    {
                        errors: [
                            {
                                error: new Error("Cannot specify both `host` and `listen` options"),
                                meta() {
                                    return [
                                        "",
                                        "Tip:           Use just the `listen` option *only* if you want to bind only to a particular host."
                                    ];
                                }
                            }
                        ],
                        level: bin_1.BsErrorLevels.Fatal,
                        type: bin_1.BsErrorTypes.HostAndListenIncompatible
                    }
                ]
            ];
        }
        // whenever we have have both `host` + `listen` options,
        // we remove the 'host' to prevent complication further down the line
        return [incoming.delete("host"), []];
    }
    return [incoming, []];
}
exports.handleHostOption = handleHostOption;
//# sourceMappingURL=handleHostOption.js.map