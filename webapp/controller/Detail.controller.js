sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("btp.academy.customers.controller.Home", {
            onInit: function () {
                this.sAppID = this.getOwnerComponent().getMetadata().getManifest()["sap.app"].id;
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);

            },
            _onRouteMatched: function (oEvent) {
                const sId = oEvent.getParameter("arguments").ID;
                const that = this;
                jQuery.ajax({
                    url: jQuery.sap.getModulePath(
                        this.sAppID +
                        "/sflight/Customers/" + sId,
                    ),
                    contentType: "application/json",
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (oCustomer) {
                        const oModel = new JSONModel(oCustomer);
                        that.getView().setModel(oModel);
                    },
                    error: function () {
                        MessageBox.error("Unable to get customer " + sId + " right now!");
                    },
                });

            },

            onSubmit: function (oEvent) {
                const oCustomer = this.getView().getModel().getData();
                const sId = oCustomer.ID
                delete oCustomer.ID
                delete oCustomer["@odata.context"]
                const that = this;
                jQuery.ajax({
                    url: jQuery.sap.getModulePath(
                        this.sAppID +
                        "/sflight/Customers/" + sId,
                    ),
                    contentType: "application/json",
                    type: "PUT",
                    dataType: "json",
                    data: JSON.stringify(oCustomer),
                    async: false,
                    success: function (oCustomer) {
                        const oModel = new JSONModel(oCustomer);
                        that.getView().setModel(oModel);
                        MessageToast.show("Customer " + sId + " updated");
                    },
                    error: function (error) {
                        MessageBox.error("Unable to modify customer " + sId + " right now!");
                    },

                });

            },

        });
    });
