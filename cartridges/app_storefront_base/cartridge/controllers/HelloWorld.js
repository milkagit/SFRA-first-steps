"use strict";

/**
 * @namespace Home
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");

server.get("HelloWorld", function (req, res, next) {
    res.json({ msg: "Hello world!" });
    next();
});

module.exports = server.exports();
