"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToFilesOption = void 0;
const immutable_1 = require("immutable");
function addToFilesOption(incoming) {
    if (!incoming.get("watch")) {
        return [incoming, []];
    }
    let serverPaths = [];
    const fromServeStatic = incoming.get("serveStatic", (0, immutable_1.List)([])).toArray();
    const ssPaths = fromServeStatic.reduce((acc, ss) => {
        if (typeof ss === "string") {
            return acc.concat(ss);
        }
        if (ss.dir && typeof ss.dir === "string") {
            return acc.concat(ss);
        }
        return acc;
    }, []);
    ssPaths.forEach(p => serverPaths.push(p));
    const server = incoming.get("server");
    if (server) {
        if (server === true) {
            serverPaths.push(".");
        }
        if (typeof server === "string") {
            serverPaths.push(server);
        }
        if (immutable_1.List.isList(server) && server.every(x => typeof x === "string")) {
            server.forEach(s => serverPaths.push(s));
        }
        if (immutable_1.Map.isMap(server)) {
            const baseDirProp = server.get("baseDir");
            const baseDirs = (0, immutable_1.List)([])
                .concat(baseDirProp)
                .filter(Boolean);
            baseDirs.forEach(s => serverPaths.push(s));
        }
    }
    const output = incoming.update("files", files => {
        return (0, immutable_1.List)([])
            .concat(files, serverPaths)
            .filter(Boolean);
    });
    return [output, []];
}
exports.addToFilesOption = addToFilesOption;
//# sourceMappingURL=addToFilesOption.js.map