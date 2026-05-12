"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProxyOption = void 0;
const url = require("url");
const immutable_1 = require("immutable");
function handleProxyOption(incoming) {
    let value = incoming.get("proxy");
    let mw;
    let target;
    if (!value || value === true) {
        return [incoming, []];
    }
    if (typeof value !== "string") {
        target = value.get("target");
        mw = value.get("middleware");
    }
    else {
        target = value;
        value = (0, immutable_1.Map)({});
    }
    if (!target.match(/^(https?):\/\//)) {
        target = "http://" + target;
    }
    const parsedUrl = url.parse(target);
    if (!parsedUrl.port) {
        parsedUrl.port = "80";
    }
    const out = {
        target: parsedUrl.protocol + "//" + parsedUrl.host,
        url: (0, immutable_1.Map)(parsedUrl)
    };
    if (mw) {
        out.middleware = mw;
    }
    const proxyOutput = value.mergeDeep(out);
    return [incoming.set("proxy", proxyOutput), []];
}
exports.handleProxyOption = handleProxyOption;
//# sourceMappingURL=handleProxyOption.js.map