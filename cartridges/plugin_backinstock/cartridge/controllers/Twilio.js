"use strict";

/**
 * @namespace Twilio
 */

var server = require("server");

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var userLoggedIn = require("*/cartridge/scripts/middleware/userLoggedIn");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/**
 * Checks if the email value entered is correct format
 * @param {string} email - email string to check if valid
 * @returns {boolean} Whether email is valid
 */
// function validateEmail(email) {
//   var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
//   return regex.test(email);
// }

/**
 * Twilio-Subscribe : The Twilio-Subscribe endpoint renders ...
 * @name Twilio-Subscribe
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
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

/**
 * Twilio-Save : The Twilio-Save endpoint is the endpoint that gets hit when a shopper has edited their profile
 * @name Base/Twilio-Save
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - dwfrm_profile_customer_firstname - Input field for the shoppers's first name
 * @param {httpparameter} - dwfrm_profile_customer_lastname - Input field for the shopper's last name
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the shopper's phone number
 * @param {httpparameter} - dwfrm_profile_customer_email - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_customer_emailconfirm - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_login_password  - Input field for the shopper's password
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */

// var phoneValid = function validatePhone(phone) {
//   var regex = /^[0-9]*$/;
//   return regex.test(phone);
// };

server.post(
  "Save",
  server.middleware.https,
  csrfProtection.validateAjaxRequest,
  function (req, res, next) {
    // var formErrors = require("*/cartridge/scripts/formErrors");
    // var URLUtils = require("dw/web/URLUtils");

    var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    var Resource = require("dw/web/Resource");
    var Transaction = require("dw/system/Transaction");

    var backInStockForm = server.forms.getForm("backInStockForm");

    var BACK_IN_STOCK_CO = "NotifyMeBackInStock";

    var productId = req.form.productId;
    var phoneNumber = req.form.phoneNumbers;

    var initialObject = CustomObjectMgr.getCustomObject(
      BACK_IN_STOCK_CO,
      productId
      // req.form.productId
    );

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
          // req.form.productId
        );
        //take the relevant product on the storefront and assign it to the custom object instance
        backInStockEntry.custom.phoneNumbers = phoneNumber;
      });
    }
    res.json({
      success: true,
      // redirectUrl: URLUtils.url("Twilio-Subscribe").toString(),
    });

    return next();
  }
);
module.exports = server.exports();
