var RouterService = function(baseUrl, appName, appVersion, clientVersion, consumerKey, consumerSecret, errorHandler)
{
    this.baseURL = baseUrl;
    this.appName = appName;
    this.appVersion = appVersion;
    this.clientVersion = clientVersion;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.airGateway = null;
    this.airRouter = null;
    this.device = null;
    this.errorHandler = errorHandler;
    //routerSendErrorHandler = errorHandler.handleSendError;
    //routerSearchErrorHandler = errorHandler.handleSearchError;
    routerServiceErrorHandler = errorHandler.handleRouterError;
    formatErrorHandler = errorHandler.handleResponseFormatError;

    this.purchaseOrder = [{"id":"EFINP00004567", "supplierName":"Widget Makers", creationDate:"09/09/1999", "lines":
        [
            {"poNumber":"EFINP00004567", "poLineReference":"EFINL00004567", "supplierProductCode":"SPC2", "productCode":"WWW2", "productDescription":"ProductDesc", "receiptByValue":"false", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Inches. Longer than centimetres shorter than a piece of string"},
            {"poNumber":"EFINP00004567", "poLineReference":"EFINL00004568", "productCode":"WWW3", "productDescription":"ProductDesc", "receiptByValue":"true", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Longer than centimetres"}
        ]
    }];
    this.purchaseOrders =
    [
        {"id":"EFINP00004567", "supplierName":"Widget Makers", creationDate:"09/09/1999",
            "lines":
            [
                {"poNumber":"EFINP00004567", "poLineReference":"EFINL00004567", "supplierProductCode":"SPC2", "productCode":"WWW2", "productDescription":"ProductDesc", "receiptByValue":"false", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Inches. Longer than centimetres shorter than a piece of string"},
                {"poNumber":"EFINP00004567", "poLineReference":"EFINL00004568", "productCode":"WWW3", "productDescription":"ProductDesc", "receiptByValue":"true", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Longer than centimetres"}
            ]
        }
    ],
    [{"id":"EFINP00004569", "supplierName":"Widget Makers", creationDate:"09/09/1999",
        "lines":
            [
                {"poNumber":"EFINP00004569", "poLineReference":"EFINL00004567", "supplierProductCode":"SPC2", "productCode":"WWW2", "productDescription":"ProductDesc", "receiptByValue":"false", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Inches. Longer than centimetres shorter than a piece of string"},
                {"poNumber":"EFINP00004569", "poLineReference":"EFINL00004568", "productCode":"WWW3", "productDescription":"ProductDesc", "receiptByValue":"true", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Longer than centimetres"}
            ]
    }];
    this.fetchPOResult =
    {
        "status":"",
        "poNumber":"",
        "poDetails":
        [
            {"id":"EFINP00004567", "supplierName":"Widget Makers", creationDate:"09/09/1999", "lines":
                [
                    {"poNumber":"EFINP00004567", "poLineReference":"EFINL00004567", "supplierProductCode":"SPC2", "productCode":"WWW2", "productDescription":"ProductDesc", "receiptByValue":"false", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Inches. Longer than centimetres shorter than a piece of string"},
                    {"poNumber":"EFINP00004567", "poLineReference":"EFINL00004568", "productCode":"WWW3", "productDescription":"ProductDesc", "receiptByValue":"true", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Longer than centimetres"}
                ]
            },
            {"id":"EFINP00004569", "supplierName":"Widget Makers", creationDate:"09/09/1999", "lines":
                [
                    {"poNumber":"EFINP00004569", "poLineReference":"EFINL00004567", "supplierProductCode":"SPC2", "productCode":"WWW2", "productDescription":"ProductDesc", "receiptByValue":"false", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Inches. Longer than centimetres shorter than a piece of string"},
                    {"poNumber":"EFINP00004569", "poLineReference":"EFINL00004568", "productCode":"WWW3", "productDescription":"ProductDesc", "receiptByValue":"true", amountToReceipt:"2", unitOfMeasureCode:"Inch", "unitOfMeasureDescription":"Longer than centimetres"}
                ]
            }
        ]
   };
    this.approvals = {"approvals":[{"id":"FPMID999","header1":"Debtor - SPC001","header2":"Reference - PO78788","header3":"","header4":"Ann Bowen","options":[{"action":"Approve","reply":"approved","role":"pos","commentRequired":false},{"action":"Reject","reply":"rejected","role":"neg","commentRequired":true}],"documents":[{"docId":"FPMID1279","msg":"Invoice"},{"docId":"FPM1279","msg":"Receipt"}],"category":"Debtor Invoices","details":[{"key":"Invoice prefix","value":"S - 12"},{"key":"Customer","value":"SPC002 - STEVENS LTD"},{"key":"Sub ledger","value":"S01"},{"key":"Transaction type","value":"I - Invoice"},{"key":"Period","value":"5"},{"key":"Year","value":"2012"},{"key":"Reference","value":"PO78788"},{"key":"Print status","value":"N - No Print"},{"key":"Header text","value":"Hire 31/10/12"},{"key":"Footer text","value":"Terms strictly 10 days from invoice date"},{"key":"Additional text","value":""}],"lines":[{"header1":"Product code","header2":"MUS001 - MUSEUM HIRE - PUMP HOUSE","details":[{"key":"Quantity","value":"1"},{"key":"Unit of measure","value":"EA - EACH"},{"key":"Price","value":"1000.00"},{"key":"Per","value":"1"},{"key":"Net value","value":"1000.00"},{"key":"VAT code","value":"SR - 20"},{"key":"Cost centre","value":"CC03 - ACCOUNTS RECEIVABLE"},{"key":"Account","value":"40017 - FACILITY CHARGES INCOME"},{"key":"Activity","value":""},{"key":"Job","value":""},{"key":"Line text","value":"PRIVATE HIRE OF LECTURE HALL AND PRIVATE TOUR."}]}]},{"id":"FPMID991","header1":"Debtor - SPC002","header2":"Reference - PO78788","header3":"","header4":"Ann Bowen","options":[{"action":"Approve","reply":"approved","role":"pos","commentRequired":false},{"action":"Reject","reply":"rejected","role":"neg","commentRequired":true}],"category":"Debtor Invoices","details":[{"key":"Invoice prefix","value":"S - 12"},{"key":"Customer","value":"SPC002 - STEVENS LTD"},{"key":"Sub ledger","value":"S01"},{"key":"Transaction type","value":"I - Invoice"},{"key":"Period","value":"5"},{"key":"Year","value":"2012"},{"key":"Reference","value":"PO78788"},{"key":"Print status","value":"N - No Print"},{"key":"Header text","value":"Hire 31/10/12"},{"key":"Footer text","value":"Terms strictly 10 days from invoice date"},{"key":"Additional text","value":""}],"lines":[{"header1":"Product code","header2":"MUS001 - MUSEUM HIRE - PUMP HOUSE","details":[{"key":"Quantity","value":"1"},{"key":"Unit of measure","value":"EA - EACH"},{"key":"Price","value":"1000.00"},{"key":"Per","value":"1"},{"key":"Net value","value":"1000.00"},{"key":"VAT code","value":"SR - 20"},{"key":"Cost centre","value":"CC03 - ACCOUNTS RECEIVABLE"},{"key":"Account","value":"40017 - FACILITY CHARGES INCOME"},{"key":"Activity","value":""},{"key":"Job","value":""},{"key":"Line text","value":"PRIVATE HIRE OF LECTURE HALL AND PRIVATE TOUR."}]}]},{"id":"FPMID992","header1":"Debtor - SPC003","header2":"Reference - PO78788","header3":"","header4":"Ann Bowen","options":[{"action":"Approve","reply":"approved","role":"pos","commentRequired":false},{"action":"Reject","reply":"rejected","role":"neg","commentRequired":true}],"category":"Debtor Invoices","details":[{"key":"Invoice prefix","value":"S - 12"},{"key":"Customer","value":"SPC002 - STEVENS LTD"},{"key":"Sub ledger","value":"S01"},{"key":"Transaction type","value":"I - Invoice"},{"key":"Period","value":"5"},{"key":"Year","value":"2012"},{"key":"Reference","value":"PO78788"},{"key":"Print status","value":"N - No Print"},{"key":"Header text","value":"Hire 31/10/12"},{"key":"Footer text","value":"Terms strictly 10 days from invoice date"},{"key":"Additional text","value":""}],"lines":[{"header1":"Product code","header2":"MUS001 - MUSEUM HIRE - PUMP HOUSE","details":[{"key":"Quantity","value":"1"},{"key":"Unit of measure","value":"EA - EACH"},{"key":"Price","value":"1000.00"},{"key":"Per","value":"1"},{"key":"Net value","value":"1000.00"},{"key":"VAT code","value":"SR - 20"},{"key":"Cost centre","value":"CC03 - ACCOUNTS RECEIVABLE"},{"key":"Account","value":"40017 - FACILITY CHARGES INCOME"},{"key":"Activity","value":""},{"key":"Job","value":""},{"key":"Line text","value":"PRIVATE HIRE OF LECTURE HALL AND PRIVATE TOUR."}]}]},{"id":"FPMID993","header1":"Debtor - SPC004","header2":"Reference - PO78788","header3":"","header4":"Ann Bowen","options":[{"action":"Approve","reply":"approved","role":"pos","commentRequired":false},{"action":"Reject","reply":"rejected","role":"neg","commentRequired":true}],"category":"Debtor Invoices","details":[{"key":"Invoice prefix","value":"S - 12"},{"key":"Customer","value":"SPC002 - STEVENS LTD"},{"key":"Sub ledger","value":"S01"},{"key":"Transaction type","value":"I - Invoice"},{"key":"Period","value":"5"},{"key":"Year","value":"2012"},{"key":"Reference","value":"PO78788"},{"key":"Print status","value":"N - No Print"},{"key":"Header text","value":"Hire 31/10/12"},{"key":"Footer text","value":"Terms strictly 10 days from invoice date"},{"key":"Additional text","value":""}],"lines":[{"header1":"Product code","header2":"MUS001 - MUSEUM HIRE - PUMP HOUSE","details":[{"key":"Quantity","value":"1"},{"key":"Unit of measure","value":"EA - EACH"},{"key":"Price","value":"1000.00"},{"key":"Per","value":"1"},{"key":"Net value","value":"1000.00"},{"key":"VAT code","value":"SR - 20"},{"key":"Cost centre","value":"CC03 - ACCOUNTS RECEIVABLE"},{"key":"Account","value":"40017 - FACILITY CHARGES INCOME"},{"key":"Activity","value":""},{"key":"Job","value":""},{"key":"Line text","value":"PRIVATE HIRE OF LECTURE HALL AND PRIVATE TOUR."}]}]}]};
}

var routerServiceErrorHandler = null;
var formatErrorHandler = null;

RouterService.prototype = {
    setDevice: function(device)
    {
        this.device = device;
        console.log("setDevice",device);
    },
    setClientVersion: function(version)
    {
        this.clientVersion = version;
        console.log("setVersion",version);
    },
    registerDevice: function(activationKey, registrationPin, okFunction)
    {
        console.log( "RouterService.registerDevice", activationKey,registrationPin);
        this._doOAuthAuthentication( activationKey,
            function() {
                app.routerService.attemptToRegister( activationKey, registrationPin, okFunction );
            },
            function (data)
            {
                routerServiceErrorHandler(data, true);
            }
        );
    },
    loginToRouter: function(extendedActivationKey, loginPin, okFunction, invalidPinFunction)
    {
        // We need to oauth authenticate
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                app.routerService.attemptToLogin( loginPin, okFunction, invalidPinFunction );
            },
            function(error) {
                routerServiceErrorHandler(error, true);
            }
        );
    },
    attemptToRegister: function (activationKey, registrationPin, okFunction) {
        app.routerService.airGateway.registerDevice( activationKey, registrationPin,  this.device.deviceModel,
            this.device.devicePlatform, this.device.deviceVersion,  this.device.deviceUUID,
            function(data) {
                console.log("GatewayResponse",gatewayResponse);
                var gatewayResponse = data.GatewayResponse;
                if (gatewayResponse.result != 'SUCCESS')
                {
                    routerServiceErrorHandler( gatewayResponse, true);
                }
                else
                {
                    console.log("DeviceId",gatewayResponse.deviceId);
                    okFunction( gatewayResponse.extendedActivationKey, gatewayResponse.deviceId );
                }
            },
            function (error)
            {
                routerServiceErrorHandler(error, true);
            }
        );
    },
    attemptToLogin: function(loginPin, okFunction, invalidPinFunction) {
        // We have been authenticated so make login attempt
        // Inform the error handler of the close dialog option
        errorDialogCloseFunction = invalidPinFunction;
        this.airGateway.authenticate( loginPin, this.device.deviceModel,
            this.device.devicePlatform, this.device.deviceVersion, this.device.deviceUUID,
            function(data) {
                var gatewayResponse = data.GatewayResponse;
                if (gatewayResponse.result != 'SUCCESS')
                {
                    routerServiceErrorHandler( gatewayResponse, true);
                }
                else
                {
                    var token = gatewayResponse.token;
                    app.routerService.airGateway.setGatewayRuntimeToken( token );
                    okFunction( token, gatewayResponse.deviceRefresh );
                }
            },
            function( error ) {
                routerServiceErrorHandler( error, true );
            }, app.dataResetPerformed );
    },
    _doOAuthAuthentication: function(activationKey, success, failure) {
        //app.tracker += ", _doOAuthAuthentication";
        console.log( "RouterService._doOAuthAuthentication airGateway "+this.airGateway );
        if (this.airGateway == undefined || this.airGateway == null)
        {
            this.airGateway = new AirGateway(this.baseURL,this.consumerKey,this.consumerSecret,this.appName,this.appVersion, this.clientVersion);
            this.airGateway.setGatewayRuntimeToken( app.gatewayRuntimeToken );
            this.airRouter = new AirRouter( this.airGateway );
        }
        // We only need to do the authentication part if we have not already got an oauth access token
        console.log("oAuth ",oauth +" oauth.getAccessTokenKey ",oauth.getAccessTokenKey());
        if (oauth == undefined || oauth.getAccessTokenKey() == null || oauth.getAccessTokenKey().length < 1)
        {
            //this.airGateway.fetchRequestToken(activationKey, success, failure );
            this.airGateway.fetchRequestToken(activationKey, success, failure );
        }
        else
        {
            success();
        }
    },
    sendItem: function(extendedActivationKey, itemID, update, okFunction, failFunction)
    {
        console.log("update",update);
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                app.routerService.airRouter.postSyncWithId( "datafeed/grn", update, itemID,
                    function(gatewayResponse, correlatedID)
                    {
                        console.log("Send result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            failFunction(correlatedID);
                            routerServiceErrorHandler( gatewayResponse, false );
                        }
                        else
                        {
                            console.log("Sent Correlated ID "+correlatedID);
                            //okFunction( correlatedID );
                            console.log("GatewayResponse",gatewayResponse);
                            console.log("RoutingResponse",gatewayResponse.routingResponse);
                            console.log("GetParsedJSON",getParsedJSON(gatewayResponse.routingResponse));
                            okFunction( correlatedID, gatewayResponse.transactionId, getParsedJSON(gatewayResponse.routingResponse) );
                        }
                    },
                    function(error, correlationID)
                    {
                        console.log("Send Error " , error);
                        failFunction(correlationID);
                        routerServiceErrorHandler(error, false);
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::sendApprovalItem error " , error);
                failFunction(itemID);
                routerServiceErrorHandler(error, false);
            }
        );
    },
    getSuppliers: function(extendedActivationKey, okFunction, failFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                app.routerService.airRouter.getSync( "datafeed/grn/suppliers",
                    function(gatewayResponse)
                    {
                        // process the response object. We need to check the version information for this application
                        // and other mundane things. If all ok then we can show the main application page.
                        //online=true;
                        console.log("Get result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            failFunction(gatewayResponse);
                            routerServiceErrorHandler( gatewayResponse,true );
                        }
                        else
                        {
                            console.log("RoutingResponse", getParsedJSON(gatewayResponse.routingResponse).grn);
                            okFunction(getParsedJSON(gatewayResponse.routingResponse).grn);
                        }
                    },
                    function( error ) {
                        console.log("GetError:"+error);
                        failFunction(error);
                        routerServiceErrorHandler( error, true );
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::getApprovals error " , error);
                failFunction(error);
                routerServiceErrorHandler( error, true );
			}
        );
    },
    getPurchaseOrders: function (extendedActivationKey, showNetworkErrors, okFunction, failFunction)
    {
        console.log("Router Service Purchase Orders");
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                // Get the items and if all ok invoke the okFunction
                app.routerService.airRouter.getSync("datafeed/grn/purchaseorders",
                    function(gatewayResponse)
                    {
                       // process the response object. We need to check the version information for this application
                       // and other mundane things. If all ok then we can show the main application page.
                       //online=true;
                        console.log("Router Service Purchase Orders Retrieved");
                       console.log("Get result "+ gatewayResponse.result);
                       if (gatewayResponse.result != 'SUCCESS')
                       {
                           //failFunction(gatewayResponse);
                           routerServiceErrorHandler( gatewayResponse,showNetworkErrors );
                       }
                       else
                       {
                           console.log("RoutingResponse", gatewayResponse.routingResponse);
                           okFunction(getParsedJSON(gatewayResponse.routingResponse));
                       }
                    },
                    function( error ) {
                        console.log("GetError:"+error);
                       failFunction(error, showNetworkErrors);
					}
                );
            },
            function (error) {
                console.log( "RouterServer::getApprovals error " , error);
                //failFunction(error);
                routerServiceErrorHandler( error, showNetworkErrors );
            }
        );
    },
    //Should be supplier instead of SupplierCode consistent with result?
    getSupplierPurchaseOrders: function(supplierCode, extendedActivationKey, okFunction, failFunction, finalFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                // Get the items and if all ok invoke the okFunction
                app.routerService.airRouter.getSyncWithParam("supplierCode", routerServiceEncode(supplierCode), "datafeed/grn/purchaseorders",
                    function(gatewayResponse)
                    {
                        // process the response object. We need to check the version information for this application
                        // and other mundane things. If all ok then we can show the main application page.
                        //online=true;
                        console.log("Get result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            //failFunction(gatewayResponse);
                            console.log("FailedParsedResponse", getParsedJSON(gatewayResponse.routingResponse));
                            routerServiceErrorHandler( gatewayResponse,true );
                        }
                        else
                        {
                            console.log("SuccessfulParsedResponse", getParsedJSON(gatewayResponse.routingResponse));
                            console.log("RoutingResponse", getParsedJSON(gatewayResponse.routingResponse));
                            okFunction(getParsedJSON(gatewayResponse.routingResponse));
                        }
                    },
                    function( error ) {
                        console.log("GetError:"+error);
                        //failFunction(error);
                        routerServiceErrorHandler( error, true );
					}
                );
            },
            function (error) {
                console.log( "RouterServer::getApprovals error " , error);
                //failFunction(error);
                routerServiceErrorHandler( error, true );
			}
        );
    },
    getPurchaseOrder: function(poNumber, extendedActivationKey, okFunction, failFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                // Get the items and if all ok invoke the okFunction
                app.routerService.airRouter.getSyncWithParam("poNumber", routerServiceEncode(poNumber), "datafeed/grn/purchaseorders",
                    function(gatewayResponse)
                    {
                        // process the response object. We need to check the version information for this application
                        // and other mundane things. If all ok then we can show the main application page.
                        //online=true;
                        console.log("Get result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            failFunction(gatewayResponse);
                            //routerSearchErrorHandler( gatewayResponse,showNonCriticalErrors );
                            routerServiceErrorHandler( gatewayResponse,true );
                        }
                        else
                        {
                            console.log("PurchaseOrderResponse: "+gatewayResponse.routingResponse);
                            okFunction(getParsedJSON(gatewayResponse.routingResponse));
                        }
                    },
                    function( error, po ) {
                        failFunction(error, po);
                        //routerServiceErrorHandler( error, true );
					}
                );
            },
            function (error) {
                failFunction(error);
                //routerServiceErrorHandler( error, true );
			}
        );
    },
	getReceiptStatus: function(receiptId, receiptTransactionId, extendedActivationKey, okFunction, failFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                // Get the items and if all ok invoke the okFunction
                app.routerService.airRouter.getSyncWithParamAndId("postedTransactionId", receiptTransactionId, receiptId, "datafeed/grn/querystatus",
                    function(gatewayResponse, id)
                    {
                        // process the response object. We need to check the version information for this application
                        // and other mundane things. If all ok then we can show the main application page.
                        //online=true;
                        console.log("Get result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            failFunction(gatewayResponse);
                            //routerSearchErrorHandler( gatewayResponse,showNonCriticalErrors );
                            routerServiceErrorHandler( gatewayResponse,true );
                        }
                        else
                        {
                            console.log("ReceiptStatusResponse: "+gatewayResponse.routingResponse);
                            okFunction(getParsedJSON(gatewayResponse.routingResponse), id);
                        }
                    },
                    function( error ) {
                        failFunction(error);
                        routerServiceErrorHandler( error, true );
                    }
                );
            },
            function (error) {
                failFunction(error);
                routerServiceErrorHandler( error, true );
            }
        );
    }
}
function routerServiceEncode(txt) {
    return "'"+txt+"'";
}




