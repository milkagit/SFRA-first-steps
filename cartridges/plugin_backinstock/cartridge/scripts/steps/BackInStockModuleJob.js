var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var ProductMgr = require("dw/catalog/ProductMgr");
var serviceTwilio = require('../serviceTwilio')

// var File = require("dw/io/File");
// var FileWriter = require("dw/io/FileWriter");
// var CSVStreamWriter = require("dw/io/CSVStreamWriter");

module.exports.execute = function () {
  var objectIterator = CustomObjectMgr.getAllCustomObjects(
    "NotifyMeBackInStock"
  );
  //get CO with notifymebackinstock -> loop to check if there is availability
  //if yes -> request to Twilio for each pfone number via another js file in the scripts folder
  //if Twilio success -> delete CO

  // try {
    while (objectIterator.hasNext()) {
      var productObject = objectIterator.next();

      var productId = productObject.custom.productId;
      var currentProduct = ProductMgr.getProduct(productId);
      var currentProductInStock = currentProduct.availabilityModel.isInStock();

      var phoneNumbers = productObject.custom.phoneNumbers;
      var currentPhoneNumbersArr = phoneNumbers.split(",");

      //to do: remove !
      if(!currentProductInStock){
        for each (test in currentPhoneNumbersArr){
          var sendToNumber = test;
          var fromNumber = '+15076462030'

          // var bodySMS =
          // "From=" +
          // fromNumber +
          // "&Body=" +
          // "Product is back in stock and you can order it." +
          // "&To=" +
          // sendToNumber;

          let response = serviceTwilio.getServiceTwilio(fromNumber, sendToNumber)
          // return getServiceTwilio.call(bodySMS)
          return response


        }
      }

    //   Transaction.wrap(function () {
    //     CustomObjectMgr.remove(productObject);
    // });

    }

  // } catch {
  // } finally {
  //   objectIterator.close();
  // }
};
