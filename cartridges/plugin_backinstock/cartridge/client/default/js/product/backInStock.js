"use strict";

$(document).ready(function () {
  $("form.backInStockForm").submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var button = $(".subscribe-backInStockForm");
    var url = form.attr("action");

    $.spinner().start();
    button.attr("disabled", true);
    $.ajax({
      url: url,
      type: "post",
      dataType: "json",
      data: form.serialize(),
      success: function (data) {
        console.log(data);
        displayMessage(data, button);
        if (data.success) {
          $(".backInStockForm").trigger("reset");
        }
      },
      error: function (err) {
        console.log(err);
        displayMessage(err, button);
      },
    });
  });
});

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} button - button that was clicked for contact us sign-up
 */
function displayMessage(data, button) {
  $.spinner().stop();
  var status;
  if (data.success) {
    status = "alert-success";
  } else {
    status = "alert-danger";
  }

  if ($(".backInStockForm-signup-message").length === 0) {
    $("body").append('<div class="backInStockForm-signup-message"></div>');
  }
  $(".backInStockForm-signup-message").append(
    '<div class="backInStockForm-signup-alert text-center ' +
      status +
      '" role="alert">' +
      data.msg +
      "</div>"
  );

  setTimeout(function () {
    $(".backInStockForm-signup-message").remove();
    // button.removeAttr("disabled");
  }, 3000);
}

// "use strict";

// $(document).ready(function () {
//   $("form.backInStockForm").submit(function (e) {
//     e.preventDefault();
//     var form = $(this);
//     var button = $(".btn-backInStock");
//     var phone = $(".phoneNumbers");
//     var url = form.attr("action");

//     $.spinner().start();
//     button.attr("disabled", true);
//     $.ajax({
//       url: url,
//       type: "post",
//       dataType: "json",
//       data: form.serialize(),
//       success: function (data) {
//         console.log(data);
//         displayMessage(data, button);
//         if (data.success) {
//           $(".backInStockForm").trigger("reset");
//         }
//       },
//       error: function (err) {
//         console.log(err);
//         displayMessage(err, button);
//       },
//     });
//   });
// });

// /**
//  * Display the returned message.
//  * @param {string} data - data returned from the server's ajax call
//  * @param {Object} button - button that was clicked for contact us sign-up
//  */
// function displayMessage(data, button) {
//   $.spinner().stop();
//   var status;
//   if (data.success) {
//     status = "alert-success";
//   } else {
//     status = "alert-danger";
//   }

//   if ($(".backInStockForm-signup-message").length === 0) {
//     $("body").append('<div class="backInStockForm-signup-message"></div>');
//   }
//   $(".backInStockForm-signup-message").append(
//     '<div class="backInStockForm-signup-alert text-center ' +
//       status +
//       '" role="alert">' +
//       data.msg +
//       "</div>"
//   );

//   setTimeout(function () {
//     $(".backInStockForm-signup-message").remove();
//     // button.removeAttr("disabled");
//   }, 3000);
// }
