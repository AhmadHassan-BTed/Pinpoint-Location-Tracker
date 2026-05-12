/**
 * tFunk for colours/compiler
 */
var chalk = require("chalk");

/**
 * Lodash clonedeep & merge
 */
var _ = require("./lodash.custom");

/**
 * Default configuration.
 * Can be overridden in first constructor arg
 */
var defaults = {

    /**
     * Initial log level
     */
    level: "info",

    /**
     * Prefix for logger
     */
    prefix: "",

    /**
     * Available levels and their score
     */
    levels: {
        "trace": 100,
        "debug": 200,
        "warn":  300,
        "info":  400,
        "error": 500
    },

    /**
     * Default prefixes
     */
    prefixes: {
        "trace": "[trace] ",
        "debug": chalk.yellow("[debug] "),
        "info":  chalk.cyan("[info] "),
        "warn":  chalk.magenta("[warn] "),
        "error": chalk.red("[error] ")
    },

    /**
     * Should easy log statement be prefixed with the level?
     */
    useLevelPrefixes: false
};


/**
 * @param {Object} config
 * @constructor
 */
var Logger = function(config) {

    if (!(this instanceof Logger)) {
        return new Logger(config);
    }

    config = config || {};

    this._mute = false;
    var safeConfig = {};
    for (var attr in config) {
        if (!config.hasOwnProperty(attr)) {
            continue;
        }
        if (attr === "__proto__" || attr === "constructor" || attr === "prototype") {
            continue;
        }
        safeConfig[attr] = config[attr];
    }
    this.config = _.merge({}, defaults, safeConfig);
    this.addLevelMethods(this.config.levels);
    this._memo = {};

    return this;
};

/**
 * Set an option once
 * @param path
 * @param value
 */
Logger.prototype.setOnce = function (path, value) {

    if (typeof this.config[path] !== "undefined") {

        if (typeof this._memo[path] === "undefined") {
            this._memo[path] = this.config[path];
        }

        this.config[path] = value;
    }

    return this;
};
/**
 * Add convenience method such as
 * logger.warn("msg")
 * logger.error("msg")
 * logger.info("msg")
 *
 * instead of
 * logger.log("warn", "msg");
 * @param items
 */
Logger.prototype.addLevelMethods = function (items) {
    Object.keys(items).forEach(function (item) {
        if (!this[item]) {
            this[item] = function () {
                var args = Array.prototype.slice.call(arguments);
                this.log.apply(this, args);
                return this;
            }.bind(this, item);
        }
    }, this);
};
/**
 * Reset the state of the logger.
 * @returns {Logger}
 */
Logger.prototype.reset = function () {

    this.setLevel(defaults.level)
        .setLevelPrefixes(defaults.useLevelPrefixes)
        .mute(false);

    return this;
};

/**
 * @param {String} level
 * @returns {boolean}
 */
Logger.prototype.canLog = function (level) {
    return this.config.levels[level] >= this.config.levels[this.config.level] && !this._mute;
};

/**
 * Log to the console with prefix
 * @param {String} level
 * @param {String} msg
 * @returns {Logger}
 */
Logger.prototype.log = function (level, msg) {

    var args = Array.prototype.slice.call(arguments);

    this.logOne(args, msg, level);

    return this;
};

/**
 * Set the log level
 * @param {String} level
 * @returns {Logger}
 */
Logger.prototype.setLevel = function (level) {

    this.config.level = level;

    return this;
};

/**
 * @param {boolean} state
 * @returns {Logger}
 */
Logger.prototype.setLevelPrefixes = function (state) {

    this.config.useLevelPrefixes = state;

    return this;
};

/**
 * @param prefix
 */
Logger.prototype.setPrefix = function (prefix) {
    this.config.prefix = strOrFn(prefix);
};

/**
 * @param {String} level
 * @param {String} msg
 * @returns {Logger}
 */
Logger.prototype.unprefixed = function (level, msg) {

    var args = Array.prototype.slice.call(arguments);

    this.logOne(args, msg, level, true);

    return this;
};

/**
 * @param {Array} args
 * @param {()=>String} msg
 * @param {String} level
 * @param {boolean} [unprefixed]
 * @returns {Logger}
 */
Logger.prototype.logOne = function (args, msg, level, unprefixed) {

    if (!this.canLog(level)) {
        return;
    }

    args = args.slice(2);

    var incomingMessage = typeof msg === "string" ? msg : msg();

    if (this.config.useLevelPrefixes && !unprefixed) {
        incomingMessage = this.config.prefixes[level] + incomingMessage;
    }

    var prefix = strOrFn(this.config.prefix);
    var result = unprefixed ? [incomingMessage] : [prefix, incomingMessage];

    args.unshift(result.join(""));

    console.log.apply(console, args);

    this.resetTemps();

    return this;
};

/**
 * Reset any temporary value
 */
Logger.prototype.resetTemps = function () {

    Object.keys(this._memo).forEach(function (key) {
        this.config[key] = this._memo[key];
    }, this);
};

/**
 * Mute the logger
 */
Logger.prototype.mute = function (bool) {

    this._mute = bool;
    return this;
};

/**
 * Clone the instance to share setup
 * @param opts
 * @returns {Logger}
 */
Logger.prototype.clone = function (opts) {

    var config = _.cloneDeep(this.config);

    if (typeof opts === "function") {
        config = opts(config) || {};
    } else {
        config = _.merge({}, config, opts || {});
    }

    return new Logger(config);
};

/**
 * @param input
 */
function strOrFn(input) {
    if (typeof input === "string") {
        return input;
    }
    if (typeof input === "function") {
        return input();
    }
    throw new Error("unreachable");
}

module.exports.Logger  = Logger;
