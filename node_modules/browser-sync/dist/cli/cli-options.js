"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printErrors = exports.makeFilesArg = exports.explodeFilesArg = exports.merge = void 0;
const immutable_1 = require("immutable");
const addToFilesOption_1 = require("./transforms/addToFilesOption");
const addDefaultIgnorePatterns_1 = require("./transforms/addDefaultIgnorePatterns");
const copyCLIIgnoreToWatchOptions_1 = require("./transforms/copyCLIIgnoreToWatchOptions");
const handleExtensionsOption_1 = require("./transforms/handleExtensionsOption");
const handleFilesOption_1 = require("./transforms/handleFilesOption");
const handleGhostModeOption_1 = require("./transforms/handleGhostModeOption");
const handlePortsOption_1 = require("./transforms/handlePortsOption");
const handleProxyOption_1 = require("./transforms/handleProxyOption");
const handleServerOption_1 = require("./transforms/handleServerOption");
const appendServerIndexOption_1 = require("./transforms/appendServerIndexOption");
const appendServerDirectoryOption_1 = require("./transforms/appendServerDirectoryOption");
const addCwdToWatchOptions_1 = require("./transforms/addCwdToWatchOptions");
const options_1 = require("../options");
const handleHostOption_1 = require("./transforms/handleHostOption");
const _ = require("../lodash.custom");
const defaultConfig = require("../default-config");
const immDefs = (0, immutable_1.fromJS)(defaultConfig);
function merge(input) {
    const merged = immDefs.mergeDeep(input);
    const transforms = [
        addToFilesOption_1.addToFilesOption,
        addCwdToWatchOptions_1.addCwdToWatchOptions,
        addDefaultIgnorePatterns_1.addDefaultIgnorePatterns,
        copyCLIIgnoreToWatchOptions_1.copyCLIIgnoreToWatchOptions,
        handleServerOption_1.handleServerOption,
        appendServerIndexOption_1.appendServerIndexOption,
        appendServerDirectoryOption_1.appendServerDirectoryOption,
        handleProxyOption_1.handleProxyOption,
        handlePortsOption_1.handlePortsOption,
        handleHostOption_1.handleHostOption,
        handleGhostModeOption_1.handleGhostModeOption,
        handleFilesOption_1.handleFilesOption,
        handleExtensionsOption_1.handleExtensionsOption,
        options_1.setMode,
        options_1.setScheme,
        options_1.setStartPath,
        options_1.setProxyWs,
        options_1.setServerOpts,
        options_1.liftExtensionsOptionFromCli,
        options_1.setNamespace,
        options_1.fixSnippetIgnorePaths,
        options_1.fixSnippetIncludePaths,
        options_1.fixRewriteRules,
        options_1.setMiddleware,
        options_1.setOpen,
        options_1.setUiPort
    ];
    const output = transforms.reduce((acc, item) => {
        const [current, currentErrors] = acc;
        const [result, errors] = item.call(null, current);
        return [result, [...currentErrors, ...errors]];
    }, [merged, []]);
    return output;
}
exports.merge = merge;
/**
 * @param string
 */
function explodeFilesArg(string) {
    return string.split(",").map(item => item.trim());
}
exports.explodeFilesArg = explodeFilesArg;
/**
 * @param value
 * @returns {{globs: Array, objs: Array}}
 */
function makeFilesArg(value) {
    let globs = [];
    let objs = [];
    if (_.isString(value)) {
        globs = globs.concat(explodeFilesArg(value));
    }
    if (immutable_1.List.isList(value) && value.size) {
        value.forEach(function (value) {
            if (_.isString(value)) {
                globs.push(value);
            }
            else {
                if (immutable_1.Map.isMap(value)) {
                    objs.push(value);
                }
            }
        });
    }
    return {
        globs: globs,
        objs: objs
    };
}
exports.makeFilesArg = makeFilesArg;
function printErrors(errors) {
    return errors
        .map(error => [
        `Error Type:    ${error.type}`,
        `Error Level:   ${error.level}`,
        error.errors.map(item => [
            `Error Message: ${item.error.message}`,
            item.meta ? item.meta().join("\n") : ""
        ]
            .filter(Boolean)
            .join("\n"))
    ].join("\n"))
        .join("\n\n");
}
exports.printErrors = printErrors;
//# sourceMappingURL=cli-options.js.map