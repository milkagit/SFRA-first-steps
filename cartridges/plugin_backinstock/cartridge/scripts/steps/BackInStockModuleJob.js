var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var ProductMgr = require("dw/catalog/ProductMgr");
var Transaction = require('dw/system/Transaction');
var serviceTwilio = require('../serviceTwilio')


module.exports.execute = function () {
  var objectIterator = CustomObjectMgr.getAllCustomObjects(
    "NotifyMeBackInStock"
  );
  //get CO with notifymebackinstock -> loop to check if there is availability
  //if yes -> request to Twilio for each pfone number via another js file in the scripts folder
  //if Twilio success -> delete CO

  try {
    while (objectIterator.hasNext()) {
      var productObject = objectIterator.next();

      var productId = productObject.custom.productId;
      var currentProductId = ProductMgr.getProduct(productId);
      var isProductInStock = currentProductId.availabilityModel.isInStock();

      var phoneNumbers = productObject.custom.phoneNumbers;
      var phoneNumbersArr = phoneNumbers.split(",");

      //to do: add ! for testing
      if(isProductInStock){
        for each (phone in phoneNumbersArr){
          var sendToNumber = phone;
          var fromNumber = '+15076462030'

          let response = serviceTwilio.getServiceTwilio(fromNumber, sendToNumber)
          return response
        }
          Transaction.wrap(function () {
            CustomObjectMgr.remove(productObject);
          });
      }
    }
  } catch (err) {
    throw new Error('Validation error', {cause: err})
  } finally {
    objectIterator.close();
  }
};
