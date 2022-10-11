sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast,MessageBox) {
        "use strict";

        return Controller.extend("btp.academy.customers.controller.Home", {
            onInit: function () {
                this.sAppID = this.getOwnerComponent().getMetadata().getManifest()["sap.app"].id;
                this.oRouter = this.getOwnerComponent().getRouter();
                this._getCustomers();
            },
            onReloadPress: function () {
                this._getCustomers();
            },
            onListItemPress: function (oEvent) {
                const sId = oEvent.getSource().getBindingContext().getObject().ID
                this.oRouter.navTo("Detail", { ID: sId });
            },
            _getCustomers: function () {
                const that = this;
                jQuery.ajax({
                    url: jQuery.sap.getModulePath(
                        this.sAppID +
                        "/sflight/Customers",
                    ),
                    contentType: "application/json",
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (oCustomers) {
                        const oModel = new JSONModel(oCustomers);
                        that.getView().setModel(oModel);
                        MessageToast.show("Customers loaded");
                    },
                    error: function () {
                        MessageBox.error("Unable to get customers right now!");
                    },
                });
            }
        });
    });
