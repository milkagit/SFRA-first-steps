"use strict";

/**
 * @namespace Death
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var deathStarService = require("*/cartridge/scripts/deathStarService");

/**
 * Death-Star - Used to retrieve a death star fact.
 * @name Death-Star
 * @param {middleware} - server.middleware.include
 */
server.get(
  "Star",
  server.middleware.include,
  cache.applyDefaultCache,
  function (req, res, next) {
    var deathStarDetail = JSON.parse(deathStarService.getDeathStar());

    res.render("death", {
      deathStarDetail: deathStarDetail,
    });

    next();
  }
);

module.exports = server.exports();
