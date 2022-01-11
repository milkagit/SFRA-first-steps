"use strict";

var server = require("server");
//Use the following for CSRF protection: add middleware in routes and hidden field on form
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");

server.get(
  "Show",
  server.middleware.https,
  csrfProtection.generateToken,
  function (req, res, next) {
    var actionUrl = dw.web.URLUtils.url("SubscriptionData-Handler");
    var subscriptionDataForm = server.forms.getForm("subscriptionData");
    subscriptionDataForm.clear();

    res.render("/subscriptionData/subscriptionData", {
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

    // Perform any server-side validation before this point, and invalidate form accordingly.

    var Transaction = require("dw/system/Transaction");

    Transaction.wrap(function () {
      var CustomObject = CustomObjectMgr.createCustomObject(
        "HomeworkJob",
        subscriptionData.email.value
      );
      CustomObject.custom.firstName = subscriptionData.firstName.value;
      CustomObject.custom.lastName = subscriptionData.firstName.value;
      CustomObject.custom.email = subscriptionData.email.value;
      CustomObject.custom.gender = subscriptionData.gender.value;

      res.json({
        // success: true,
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
