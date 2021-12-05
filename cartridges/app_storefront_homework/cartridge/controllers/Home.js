"use strict";

/**
 * @namespace Home
 */

var server = require("server");
var HookMgr = require("dw/system/HookMgr");

//search on the right side
server.extend(module.superModule);

server.append("Show", function (req, res, next) {
    var viewData = res.getViewData();

    if (!viewData) {
        next();
    } else {
        viewData.renderData = res.json({
            msg: "Render additional JSON and display it on the home-show page",
        });

        //this works too but it doesn't display the JSON
        // viewData.renderData = {
        //     value: "Extend the logic with this data",
        // };
    }
    res.setViewData(viewData);
    next();
    if (HookMgr.hasHook("app.experience.editmode")) {
        HookMgr.callHook(
            "app.experience.editmode",
            res.json({ msg: "Additional data" })
        );
    }
});

module.exports = server.exports();
