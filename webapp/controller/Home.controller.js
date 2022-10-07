sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("btp.academy.customers.controller.Home", {
            onInit: function () {
                sap.ui.getCore().sapAppID = this.getOwnerComponent()
                    .getMetadata()
                    .getManifest()["sap.app"].id;

                    const that = this;
                    jQuery.ajax({
                        url: jQuery.sap.getModulePath(
                            sap.ui.getCore().sapAppID +
                            "/sflight/Customers",
                        ),
                        contentType: "application/json",
                        type: "GET",
                        dataType: "json",
                        async: false,
                        success: function (oCustomers) {
                            const oModel = new JSONModel(oCustomers);
                            that.getView().setModel(oModel);
                        },
                        error: function (error) {
                            sap.m.MessageToast.show("Error");
                        },
                    });
            },
            onPress: function () {
                const that = this;
                jQuery.ajax({
                    url: jQuery.sap.getModulePath(
                        sap.ui.getCore().sapAppID +
                        "/sflight/Customers",
                    ),
                    contentType: "application/json",
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (oCustomers) {
                        const oModel = new JSONModel(oCustomers);
                        that.getView().setModel(oModel);
                    },
                    error: function (error) {
                        sap.m.MessageToast.show("Error");
                    },
                });
            }


        });
    });
