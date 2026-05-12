"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeParams = exports.parseParams = exports.devIp = exports.UAParser = exports.easyExtender = exports.serveStatic = exports.connect = exports.portscanner = exports.defaultCallback = exports.arrayify = exports.eachSeries = exports.verifyConfig = exports.getConfigErrors = exports.isMap = exports.isList = exports.willCauseReload = exports.hostnameSuffix = exports.fail = exports.opnWrapper = exports.openBrowser = exports.getUaString = exports.getPort = exports.getPorts = exports._makeUrl = exports.getUrls = exports.getUrl = exports.getUrlOptions = exports.getHostIp = void 0;
const devIp = require("dev-ip");
exports.devIp = devIp;
const portScanner = require("portscanner");
const path = require("path");
const UAParser = require("ua-parser-js");
exports.UAParser = UAParser;
const Immutable = require("immutable");
const immutable_1 = require("immutable");
const _ = require("./lodash.custom");
const parser = new UAParser();
/**
 * @param {Object} options
 * @returns {String|boolean} - the IP address
 * @param devIp
 */
function getHostIp(options, devIp) {
    if (options) {
        var host = options.get("host");
        if (host && host !== "localhost") {
            return host;
        }
        if (options.get("detect") === false || !devIp.length) {
            return false;
        }
    }
    return devIp.length ? devIp[0] : false;
}
exports.getHostIp = getHostIp;
/**
 * Set URL Options
 */
function getUrlOptions(options) {
    const scheme = options.get("scheme");
    const port = options.get("port");
    const urls = {};
    const listen = options.get("listen");
    if (options.get("online") === false || listen) {
        const host = listen || "localhost";
        urls.local = getUrl(`${scheme}://${host}:${port}`, options);
        return Immutable.fromJS(urls);
    }
    const fn = exports.getHostIp;
    const external = hostnameSuffix(fn(options, devIp()), options);
    const localhost = hostnameSuffix("localhost", options);
    return Immutable.fromJS(getUrls(external, localhost, scheme, options));
}
exports.getUrlOptions = getUrlOptions;
/**
 * Append a start path if given in options
 * @param {String} url
 * @param {Object} options
 * @returns {String}
 */
function getUrl(url, options) {
    var prefix = "/";
    var startPath = options.get("startPath");
    if (startPath) {
        if (startPath.charAt(0) === "/") {
            prefix = "";
        }
        url = url + prefix + startPath;
    }
    return url;
}
exports.getUrl = getUrl;
/**
 * @param {String} external
 * @param {String} local
 * @param {String} scheme
 * @param {Object} options
 * @returns {{local: string, external: string}}
 */
function getUrls(external, local, scheme, options) {
    var urls = {
        local: getUrl(_makeUrl(scheme, local, options.get("port")), options)
    };
    if (external !== local) {
        urls.external = getUrl(_makeUrl(scheme, external, options.get("port")), options);
    }
    return urls;
}
exports.getUrls = getUrls;
/**
 * @param {String} scheme
 * @param {String} host
 * @param {Number} port
 * @returns {String}
 * @private
 */
function _makeUrl(scheme, host, port) {
    return scheme + "://" + host + ":" + port;
}
exports._makeUrl = _makeUrl;
/**
 * Get ports
 * @param {Object} options
 * @param {Function} cb
 */
function getPorts(options, cb) {
    var port = options.get("port");
    var ports = options.get("ports"); // backwards compatibility
    var host = options.get("listen", "localhost"); // backwards compatibility
    var max;
    if (ports) {
        port = ports.get("min");
        max = ports.get("max") || null;
    }
    var fn = exports.getPort;
    fn(host, port, max, cb);
}
exports.getPorts = getPorts;
function getPort(host, port, max, cb) {
    portScanner.findAPortNotInUse(port, max, {
        host: host,
        timeout: 1000
    }, cb);
}
exports.getPort = getPort;
/**
 * @param {String} ua
 * @returns {Object}
 */
function getUaString(ua) {
    return parser.setUA(ua).getBrowser();
}
exports.getUaString = getUaString;
/**
 * Open the page in browser
 * @param {String} url
 * @param {Object} options
 * @param {BrowserSync} bs
 */
function openBrowser(url, options, bs) {
    const open = options.get("open");
    const browser = options.get("browser");
    if (_.isString(open)) {
        if (options.getIn(["urls", open])) {
            url = options.getIn(["urls", open]);
        }
    }
    const fn = exports.opnWrapper;
    if (open) {
        if (browser !== "default") {
            if ((0, exports.isList)(browser)) {
                browser.forEach(function (browser) {
                    fn(url, browser, bs);
                });
            }
            else {
                fn(url, browser, bs); // single
            }
        }
        else {
            fn(url, null, bs);
        }
    }
}
exports.openBrowser = openBrowser;
/**
 * Wrapper for opn module
 * @param url
 * @param name
 * @param bs
 */
function opnWrapper(url, name, bs) {
    var options = (function () {
        if (_.isString(name)) {
            return { app: name };
        }
        if (Immutable.Map.isMap(name)) {
            return name.toJS();
        }
        return {};
    })();
    var opn = require("opn");
    opn(url, options).catch(function () {
        bs.events.emit("browser:error");
    });
}
exports.opnWrapper = opnWrapper;
/**
 * @param {Boolean} kill
 * @param {String|Error} [errMessage]
 * @param {Function} [cb]
 */
function fail(kill, errMessage, cb) {
    if (kill) {
        if (_.isFunction(cb)) {
            if (errMessage.message) {
                // Is this an error object?
                cb(errMessage);
            }
            else {
                cb(new Error(errMessage));
            }
        }
        process.exit(1);
    }
}
exports.fail = fail;
/**
 * hostnameSuffix
 * @param {String} host
 * @param {Object} options
 * @returns {String}
 */
function hostnameSuffix(host, options) {
    var suffix = options.get("hostnameSuffix");
    if (suffix) {
        return host + suffix;
    }
    return host;
}
exports.hostnameSuffix = hostnameSuffix;
/**
 * Determine if an array of file paths will cause a full page reload.
 * @param {Array} needles - filepath such as ["core.css", "index.html"]
 * @param {Array} haystack
 * @returns {Boolean}
 */
function willCauseReload(needles, haystack) {
    return needles.some(function (needle) {
        return !_.includes(haystack, path.extname(needle).replace(".", ""));
    });
}
exports.willCauseReload = willCauseReload;
exports.isList = Immutable.List.isList;
exports.isMap = Immutable.Map.isMap;
/**
 * @param {Map} options
 * @returns {Array}
 */
function getConfigErrors(options) {
    var messages = require("./config").errors;
    var errors = [];
    if (options.get("server") && options.get("proxy")) {
        errors.push(messages["server+proxy"]);
    }
    return errors;
}
exports.getConfigErrors = getConfigErrors;
/**
 * @param {Map} options
 * @param {Function} [cb]
 */
function verifyConfig(options, cb) {
    var errors = getConfigErrors(options);
    if (errors.length) {
        fail(true, errors.join("\n"), cb);
        return false;
    }
    return true;
}
exports.verifyConfig = verifyConfig;
function eachSeries(arr, iterator, callback) {
    callback = callback || function () { };
    var completed = 0;
    var iterate = function () {
        iterator(arr[completed], function (err) {
            if (err) {
                callback(err);
                callback = function () { };
            }
            else {
                ++completed;
                if (completed >= arr.length) {
                    callback();
                }
                else {
                    iterate();
                }
            }
        });
    };
    iterate();
}
exports.eachSeries = eachSeries;
/**
 * @param {Immutable.List|Array|String} incoming
 * @returns {Array}
 */
function arrayify(incoming) {
    if (immutable_1.List.isList(incoming)) {
        return incoming.toArray();
    }
    return [].concat(incoming).filter(Boolean);
}
exports.arrayify = arrayify;
function defaultCallback(err) {
    if (err && err.message) {
        console.error(err.message);
    }
}
exports.defaultCallback = defaultCallback;
exports.portscanner = portScanner;
exports.connect = require("connect");
exports.serveStatic = require("./server/serve-static-wrapper").default();
exports.easyExtender = require("easy-extender");
/**
 * Just for backwards compat around old argument styles
 */
function parseParams(search) {
    const params = new URLSearchParams(search);
    const parsed = Object.create(null);
    for (let [key, value] of params) {
        let nextKey = key;
        let arrayType = false;
        if (nextKey.slice(-2) === "[]") {
            nextKey = key.slice(0, -2);
            arrayType = true;
        }
        const curr = parsed[nextKey];
        if (curr && Array.isArray(curr)) {
            curr.push(value);
        }
        else if (curr) {
            // if it already exists, but is not already an array, upgrade to array
            parsed[nextKey] = [curr, value];
        }
        else {
            // otherwise create the original value
            if (arrayType) {
                parsed[nextKey] = [value];
            }
            else {
                parsed[nextKey] = value;
            }
        }
    }
    return parsed;
}
exports.parseParams = parseParams;
/**
 * Also for backwards compat around old argument styles
 */
function serializeParams(args = {}) {
    const output = new URLSearchParams();
    for (let [key, value] of Object.entries(args)) {
        if (Array.isArray(value)) {
            for (let valueElement of value) {
                output.append(key, valueElement);
            }
        }
        else {
            output.append(key, String(value));
        }
    }
    return output;
}
exports.serializeParams = serializeParams;
//# sourceMappingURL=utils.js.map