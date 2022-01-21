"use strict";

/**
 * If the resource to add is not already in the resource array then add it to the array
 * @param {Array} resourceArray - Either the scripts or styles array to which you want to add the resource src to.
 */

function getServiceTwilio(fromNumber, sendToNumber) {
  var fromNumber = fromNumber;
  var sendToNumber = sendToNumber;
  var bodySMS =
    "From=" +
    fromNumber +
    "&Body=" +
    "Product is back in stock and you can order it." +
    "&To=" +
    sendToNumber;
  var serviceTwilio = dw.svc.LocalServiceRegistry.createService(
    "http.twilio.getTwilio",
    {
      createRequest: function (svc, args) {
        // svc.setRequestMethod("POST"); - post is default
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        // var bodySMS =
        //   "From=" +
        //   fromNumber +
        //   "&Body=" +
        //   "Product is back in stock and you can order it." +
        //   "&To=" +
        //   sendToNumber;
        // `From ${fromNumber} &Body= "Product is back in stock and you can order it" &To ${sendToNumber}`

        // return bodySMS;
        return args;
      },

      parseResponse: function (svc, client) {
        return client.text;
      },
    }
  );

  // var response = serviceTwilio.call().object;
  var response = serviceTwilio.call(bodySMS);

  // return JSON.parse(response);
  return response;
}

module.exports = {
  getServiceTwilio: getServiceTwilio,
};
