"use strict";

var server = require("server");
//Use the following for CSRF protection: add middleware in routes and hidden field on form
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/**
 * @name SubscriptionData-Show
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - server.middleware.https
 * @param {renders} - isml
 * @param {serverfunction} = get
 */

server.get(
  "Show",
  server.middleware.https,
  csrfProtection.generateToken,
  function (req, res, next) {
    var actionUrl = dw.web.URLUtils.url("SubscriptionData-Handler");
    var subscriptionDataForm = server.forms.getForm("subscriptionData");
    subscriptionDataForm.clear();

    res.render("subscriptionData/subscriptionData", {
      actionUrl: actionUrl,
      subscriptionDataForm: subscriptionDataForm,
    });

    next();
  }
);

server.post(
  "Handler",
  csrfProtection.validateAjaxRequest,
  server.middleware.https,
  function (req, res, next) {
    var subscriptionDataForm = server.forms.getForm("subscriptionData");
    var URLUtils = require("dw/web/URLUtils");
    var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    var Transaction = require("dw/system/Transaction");
    var UUIDUtils = require("dw/util/UUIDUtils");

    //form validation
    // if (subscriptionDataForm.valid) {
    // }

    Transaction.wrap(function () {
      var CustomObject = CustomObjectMgr.createCustomObject(
        "HomeworkJob",
        subscriptionDataForm.email.value
      );
      //remove the group name storedFormDetails as you don't need groups in this case
      CustomObject.custom.firstName = subscriptionDataForm.firstName.value;
      CustomObject.custom.lastName = subscriptionDataForm.lastName.value;
      CustomObject.custom.email = subscriptionDataForm.email.value;
      // CustomObject.custom.gender = subscriptionDataForm.gender.value;

      res.json({
        success: true,
        redirectUrl: URLUtils.url(
          "SubscriptionData-Show"
          // "SubscriptionData-SubscriptionData"
        ).toString(),
      });
    });

    next();
  }
);

module.exports = server.exports();
