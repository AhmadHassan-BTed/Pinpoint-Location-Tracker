"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUiPort = exports.setMiddleware = exports.fixSnippetIncludePaths = exports.fixSnippetIgnorePaths = exports.fixRewriteRules = exports.liftExtensionsOptionFromCli = exports.setServerOpts = exports.setNamespace = exports.setStartPath = exports.setScheme = exports.setMode = exports.setOpen = exports.setProxyWs = void 0;
const _ = require("./lodash.custom");
const Immutable = require("immutable");
const defaultConfig = require("./default-config");
/**
 * Move top-level ws options to proxy.ws
 * This is to allow it to be set from the CLI
 * @param incoming
 */
function setProxyWs(incoming) {
    if (incoming.get("ws") && incoming.get("mode") === "proxy") {
        return [incoming.setIn(["proxy", "ws"], true), []];
    }
    return [incoming, []];
}
exports.setProxyWs = setProxyWs;
/**
 * @param incoming
 */
function setOpen(incoming) {
    return [
        incoming.update("open", function (open) {
            if (incoming.get("mode") === "snippet") {
                if (open !== "ui" && open !== "ui-external") {
                    return false;
                }
            }
            return open;
        }),
        []
    ];
}
exports.setOpen = setOpen;
/**
 * Set the running mode
 * @param incoming
 */
function setMode(incoming) {
    const output = incoming.set("mode", (function () {
        if (incoming.get("server")) {
            return "server";
        }
        if (incoming.get("proxy")) {
            return "proxy";
        }
        return "snippet";
    })());
    return [output, []];
}
exports.setMode = setMode;
/**
 * @param incoming
 */
function setScheme(incoming) {
    var scheme = "http";
    if (incoming.getIn(["server", "https"])) {
        scheme = "https";
    }
    if (incoming.get("https")) {
        scheme = "https";
    }
    if (incoming.getIn(["proxy", "url", "protocol"])) {
        if (incoming.getIn(["proxy", "url", "protocol"]) === "https:") {
            scheme = "https";
        }
    }
    return [incoming.set("scheme", scheme), []];
}
exports.setScheme = setScheme;
/**
 * @param incoming
 */
function setStartPath(incoming) {
    if (incoming.get("proxy")) {
        var path = incoming.getIn(["proxy", "url", "path"]);
        if (path !== "/") {
            return [incoming.set("startPath", path), []];
        }
    }
    return [incoming, []];
}
exports.setStartPath = setStartPath;
/**
 * @param incoming
 */
function setNamespace(incoming) {
    var namespace = incoming.getIn(["socket", "namespace"]);
    if (_.isFunction(namespace)) {
        return [
            incoming.setIn(["socket", "namespace"], namespace(defaultConfig.socket.namespace)),
            []
        ];
    }
    return [incoming, []];
}
exports.setNamespace = setNamespace;
/**
 * @param incoming
 */
function setServerOpts(incoming) {
    if (!incoming.get("server")) {
        return [incoming, []];
    }
    var indexarg = incoming.getIn(["server", "index"]) || "index.html";
    var optPath = ["server", "serveStaticOptions"];
    if (!incoming.getIn(optPath)) {
        return [
            incoming.setIn(optPath, Immutable.Map({
                index: indexarg
            })),
            []
        ];
    }
    if (!incoming.hasIn(optPath.concat(["index"]))) {
        return [incoming.setIn(optPath.concat(["index"]), indexarg), []];
    }
    return [incoming, []];
}
exports.setServerOpts = setServerOpts;
function liftExtensionsOptionFromCli(incoming) {
    // cli extensions
    var optPath = ["server", "serveStaticOptions"];
    if (incoming.get("extensions")) {
        return [
            incoming.setIn(optPath.concat(["extensions"]), incoming.get("extensions")),
            []
        ];
    }
    return [incoming, []];
}
exports.liftExtensionsOptionFromCli = liftExtensionsOptionFromCli;
/**
 * Back-compat fixes for rewriteRules being set to a boolean
 */
function fixRewriteRules(incoming) {
    return [
        incoming.update("rewriteRules", function (rr) {
            return Immutable.List([])
                .concat(rr)
                .filter(Boolean);
        }),
        []
    ];
}
exports.fixRewriteRules = fixRewriteRules;
function fixSnippetIgnorePaths(incoming) {
    var ignorePaths = incoming.getIn(["snippetOptions", "ignorePaths"]);
    if (ignorePaths) {
        if (_.isString(ignorePaths)) {
            ignorePaths = [ignorePaths];
        }
        ignorePaths = ignorePaths.map(ensureSlash);
        return [
            incoming.setIn(["snippetOptions", "blacklist"], Immutable.List(ignorePaths)),
            []
        ];
    }
    return [incoming, []];
}
exports.fixSnippetIgnorePaths = fixSnippetIgnorePaths;
function fixSnippetIncludePaths(incoming) {
    var includePaths = incoming.getIn(["snippetOptions", "whitelist"]);
    if (includePaths) {
        includePaths = includePaths.map(ensureSlash);
        return [
            incoming.setIn(["snippetOptions", "whitelist"], Immutable.List(includePaths)),
            []
        ];
    }
    return [incoming, []];
}
exports.fixSnippetIncludePaths = fixSnippetIncludePaths;
/**
 * Enforce paths to begin with a forward slash
 */
function ensureSlash(item) {
    if (item[0] !== "/") {
        return "/" + item;
    }
    return item;
}
/**
 *
 */
function setMiddleware(incoming) {
    var mw = getMiddlwares(incoming);
    return [incoming.set("middleware", mw), []];
}
exports.setMiddleware = setMiddleware;
/**
 * top-level option, or given as part of the proxy/server option
 * @param item
 * @returns {*}
 */
function getMiddlwares(item) {
    var mw = item.get("middleware");
    var serverMw = item.getIn(["server", "middleware"]);
    var proxyMw = item.getIn(["proxy", "middleware"]);
    var list = Immutable.List([]);
    if (mw) {
        return listMerge(list, mw);
    }
    if (serverMw) {
        return listMerge(list, serverMw);
    }
    if (proxyMw) {
        return listMerge(list, proxyMw);
    }
    return list;
}
/**
 * @param item
 * @returns {*}
 */
function isList(item) {
    return Immutable.List.isList(item);
}
/**
 * @param list
 * @param item
 * @returns {*}
 */
function listMerge(list, item) {
    if (_.isFunction(item)) {
        list = list.push(item);
    }
    if (isList(item) && item.size) {
        list = list.merge(item);
    }
    return list;
}
/**
 * @param incoming
 * @returns {*}
 */
function setUiPort(incoming) {
    if (incoming.get("uiPort")) {
        return [incoming.setIn(["ui", "port"], incoming.get("uiPort")), []];
    }
    return [incoming, []];
}
exports.setUiPort = setUiPort;
//# sourceMappingURL=options.js.map