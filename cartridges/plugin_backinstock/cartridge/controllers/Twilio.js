"use strict";

var server = require("server");

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var userLoggedIn = require("*/cartridge/scripts/middleware/userLoggedIn");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/**
 * Twilio-Save : The Twilio-Save endpoint receives the subscription data and passes it to a custom object
 * @namespace Twilio
 * @name Twilio-Save
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the shopper's phone number
 * @param {httpparameter} - dwfrm_profile_product_id - hidden input for product ID
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {renders} - isml
 * @param {serverfunction} - post
 */

/**
 * Checks if the phone value entered is correct format
 * @param {string} phone - phone string to check if valid
 * @returns {boolean} Whether phone is valid
 */
// function phoneValid(phone) {
//   // var regex = /^[0-9]*$/;
//   var regex = /^([+]?359)|0?(|-| )8[789]\d{1}(|-| )\d{3}(|-| )\d{3}$/im;
//   return regex.test(phone);
// }

server.post(
  "Save",
  server.middleware.https,
  csrfProtection.validateAjaxRequest,
  function (req, res, next) {
    //initial variables
    var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    var Resource = require("dw/web/Resource");
    var Transaction = require("dw/system/Transaction");

    var backInStockForm = server.forms.getForm("backInStockForm");
    var BACK_IN_STOCK_CO = "NotifyMeBackInStock";
    var form = req.form;

    var productId = req.form.productId;
    var phoneNumber = req.form.phoneNumbers;

    var initialObject = CustomObjectMgr.getCustomObject(
      BACK_IN_STOCK_CO,
      productId
    );

    var error = false;

    // var displayErrorMessage;
    // var successMessage;
    //initial variables end

    // if (phoneValid(phoneNumber)) {
    //   backInStockForm.valid = true;
    // }

    try {
      if (!empty(initialObject)) {
        Transaction.wrap(function () {
          var backInStockEntry = CustomObjectMgr.getCustomObject(
            BACK_IN_STOCK_CO,
            productId
          );
          backInStockEntry.custom.phoneNumbers =
            backInStockEntry.custom.phoneNumbers + "," + phoneNumber;
        });
      } else {
        Transaction.wrap(function () {
          var backInStockEntry = CustomObjectMgr.createCustomObject(
            BACK_IN_STOCK_CO,
            productId
          );
          backInStockEntry.custom.phoneNumbers = phoneNumber;
        });
      }

      // res.json({
      //   success: true,
      //   // redirectUrl: URLUtils.url("Twilio-Subscribe").toString(),
      // });
    } catch (eror) {
      error = true;
    }

    if (error) {
      res.json({
        success: false,
        error: true,
        // redirectUrl: URLUtils.url("Twilio-Subscribe").toString(),
        // msg: Resource.msg("failSubscribe.message", "form", null),
      });
    } else {
      res.json({
        success: true,
        error: false,
        // msg: Resource.msg("successSubscribe.message", "form", null),
        // redirectUrl: URLUtils.url("Twilio-Subscribe").toString(),
      });
    }

    return next();
  }
);
module.exports = server.exports();

//backup - working
// var CustomObjectMgr = require("dw/object/CustomObjectMgr");
// var Resource = require("dw/web/Resource");
// var Transaction = require("dw/system/Transaction");

// var backInStockForm = server.forms.getForm("backInStockForm");

// var BACK_IN_STOCK_CO = "NotifyMeBackInStock";

// var productId = req.form.productId;
// var phoneNumber = req.form.phoneNumbers;

// var initialObject = CustomObjectMgr.getCustomObject(
//   BACK_IN_STOCK_CO,
//   productId
//   // req.form.productId
// );

// if (!empty(initialObject)) {
//   Transaction.wrap(function () {
//     var backInStockEntry = CustomObjectMgr.getCustomObject(
//       BACK_IN_STOCK_CO,
//       productId
//     );
//     backInStockEntry.custom.phoneNumbers =
//       backInStockEntry.custom.phoneNumbers + "," + phoneNumber;
//   });
// } else {
//   Transaction.wrap(function () {
//     var backInStockEntry = CustomObjectMgr.createCustomObject(
//       BACK_IN_STOCK_CO,
//       productId
//       // req.form.productId
//     );
//     //take the relevant product on the storefront and assign it to the custom object instance
//     backInStockEntry.custom.phoneNumbers = phoneNumber;
//   });
// }
// res.json({
//   success: true,
//   // redirectUrl: URLUtils.url("Twilio-Subscribe").toString(),
// });

// return next();
// backup end
//

/**
 * Twilio-Subscribe : The Twilio-Subscribe endpoint renders ...
 * @param {serverfunction} - get
 */
//to be removed
// server.get(
//   "Subscribe",
//   server.middleware.https,
//   //the token is the hiden field for submitting the form
//   csrfProtection.generateToken,
//   // userLoggedIn.validateLoggedIn,
//   consentTracking.consent,
//   function (req, res, next) {
//     // var Resource = require("dw/web/Resource");
//     var URLUtils = require("dw/web/URLUtils");
//     // var accountHelpers = require("*/cartridge/scripts/account/accountHelpers");

//     var backInStockForm = server.forms.getForm("backInStockForm");
//     backInStockForm.clear();

//     res.render("product/components/backInStockForm", {
//       backInStockForm: backInStockForm,
//     });

//     next();
//   }
// );
