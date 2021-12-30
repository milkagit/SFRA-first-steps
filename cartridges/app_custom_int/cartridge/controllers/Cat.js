"use strict";

/**
 * @namespace Cat
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var catFactService = require("*/cartridge/scripts/catFactService");

/**
 * Cat-Fact - Used to retrieve a cat fact.
 * @name Cat-Fact
 * @param {middleware} - server.middleware.include
 */
server.get(
  "Fact",
  server.middleware.include,
  cache.applyDefaultCache,
  function (req, res, next) {
    // var catFact = "TEST CAT FACT";

    // var httpClient = new dw.net.HTTPClient();
    // httpClient.open("GET", "https://catfact.ninja/fact");
    // httpClient.send();

    // var message = httpClient.text;

    // var catFact = JSON.parse(httpClient.text);
    var catFact = JSON.parse(catFactService.getCatFact());

    res.render("cat", {
      catFact: catFact,
    });

    next();
  }
);

module.exports = server.exports();
