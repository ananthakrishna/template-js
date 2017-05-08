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
    routerSendErrorHandler = errorHandler.handleSendError;
    routerSearchErrorHandler = errorHandler.handleSearchError;
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
    attemptToRegister: function( activationKey, registrationPin, okFunction) {
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
            } );
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
        console.log("oAuth "+oauth +" oauth.getAccessTokenKey "+ oauth.getAccessTokenKey());
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
    getSuppliers: function(extendedActivationKey, showNonCriticalErrors, okFunction, failFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                //Needs to be changed to:
                //app.routerService.airRouter.getSync( "datafeed/receipting",
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
                            routerServiceErrorHandler( gatewayResponse,showNonCriticalErrors );
                        }
                        else
                        {
                            //parseJSON(gatewayResponse.routingResponse, okFunction);
                            //okFunction(getParsedJSON(gatewayResponse.routingResponse));
                            /*var purchaseOrders = [];
                            purchaseOrders[0] = this.purchaseOrder;*/
                            console.log("RoutingResponse", getParsedJSON(gatewayResponse.routingResponse).grn);
                            okFunction(getParsedJSON(gatewayResponse.routingResponse).grn);
                        }
                    },
                    function( error ) {
                        console.log("GetError:"+error);
                        failFunction(error);
                        routerServiceErrorHandler( error, showNonCriticalErrors );
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::getApprovals error " , error);
                failFunction(error);
                routerServiceErrorHandler( error, showNonCriticalErrors );
            }
        );
    },
    getPurchaseOrders: function(extendedActivationKey, showNonCriticalErrors, okFunction, failFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                //Needs to be changed to:
                //app.routerService.airRouter.getSync( "datafeed/receipting",
                // Get the items and if all ok invoke the okFunction
                app.routerService.airRouter.getSync("datafeed/grn/purchaseorders",
                    function(gatewayResponse)
                    {
                       // process the response object. We need to check the version information for this application
                       // and other mundane things. If all ok then we can show the main application page.
                       //online=true;
                       console.log("Get result "+ gatewayResponse.result);
                       if (gatewayResponse.result != 'SUCCESS')
                       {
                           failFunction(gatewayResponse);
                           routerServiceErrorHandler( gatewayResponse,showNonCriticalErrors );
                       }
                       else
                       {
                           //parseJSON(gatewayResponse.routingResponse, okFunction);
                           console.log("RoutingResponse", gatewayResponse.routingResponse);
                           okFunction(getParsedJSON(gatewayResponse.routingResponse).grn[0].poDetails);
                       }
                    },
                    function( error ) {
                       console.log("GetError:"+error);
                       failFunction(error);
                       routerServiceErrorHandler( error, showNonCriticalErrors );
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::getApprovals error " , error);
                failFunction(error);
                routerServiceErrorHandler( error, showNonCriticalErrors );
            }
        );
    },
    //Should be supplier instead of SupplierCode consistent with result?
    getSupplierPurchaseOrders: function(supplierCode, extendedActivationKey, showNonCriticalErrors, okFunction, failFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                // Get the items and if all ok invoke the okFunction
                //var paramString = createStringParam("supplierCode", supplierCode);
                 //console.log("params "+paramString);
                //return;

                //Needs to be changed to:
                //app.routerService.airRouter.getSync( "datafeed/receipting",
                app.routerService.airRouter.getSupplierPurchaseOrders(supplierCode,"datafeed/grn/purchaseorders",
                    function(gatewayResponse)
                    {
                        // process the response object. We need to check the version information for this application
                        // and other mundane things. If all ok then we can show the main application page.
                        //online=true;
                        console.log("Get result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            failFunction(gatewayResponse);
                            routerServiceErrorHandler( gatewayResponse,showNonCriticalErrors );
                        }
                        else
                        {
                            //parseJSON(gatewayResponse.routingResponse, okFunction);
                            //okFunction(getParsedJSON(gatewayResponse.routingResponse));
                            /*var purchaseOrders = [];
                            purchaseOrders[0] = this.purchaseOrder;
                            okFunction(this.purchaseOrders);*/
                            console.log("RoutingResponse", getParsedJSON(gatewayResponse.routingResponse).grn[0].poDetails);
                            okFunction(getParsedJSON(gatewayResponse.routingResponse).grn[0].poDetails);
                        }
                    },
                    function( error ) {
                        console.log("GetError:"+error);
                        failFunction(error);
                        routerServiceErrorHandler( error, showNonCriticalErrors );
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::getApprovals error " , error);
                failFunction(error);
                routerServiceErrorHandler( error, showNonCriticalErrors );
            }
        );
    },
    getPurchaseOrder: function(poNumber, extendedActivationKey, showNonCriticalErrors, okFunction, failFunction)
    {
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                // Get the items and if all ok invoke the okFunction
                app.routerService.airRouter.getPurchaseOrder(poNumber,"datafeed/grn/purchaseorders",
                    function(gatewayResponse)
                    {
                        // process the response object. We need to check the version information for this application
                        // and other mundane things. If all ok then we can show the main application page.
                        //online=true;
                        console.log("Get result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            failFunction(gatewayResponse);
                            routerSearchErrorHandler( gatewayResponse,showNonCriticalErrors );
                        }
                        else
                        {
                            okFunction(getParsedJSON(gatewayResponse.routingResponse).grn[0].poDetails);
                        }
                    },
                    function( error ) {
                        console.log("GetError:"+error);
                        failFunction(error);
                        routerSearchErrorHandler( error, showNonCriticalErrors );
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::getApprovals error " , error);
                failFunction(error);
                routerSearchErrorHandler( error, showNonCriticalErrors );
            }
        );
    },
    sendApprovalItem: function(extendedActivationKey, itemID, update, okFunction, failFunction)
    {
        //app.tracker += ", sendApprovalItem";
        this._doOAuthAuthentication( extendedActivationKey,
            function() {
                app.routerService.airRouter.put( "datafeed/approvals", update, itemID,
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
                            okFunction( correlatedID, gatewayResponse.transactionId );
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
    getTransactionStatusList: function(extendedActivationKey, transactionIds, okFunction, failFunction)
    {
        console.log("TransStatList",transactionIds);
        this._doOAuthAuthentication( extendedActivationKey,
            function() {

                app.routerService.airGateway.postTransactions(transactionIds,
                    function(gatewayResponse)
                    {
                        gatewayResponse = gatewayResponse.GatewayResponse;
                        console.log("GatewayResponse ", gatewayResponse);
                        console.log("Transactioncheck result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            failFunction(gatewayResponse);
                            routerServiceErrorHandler( gatewayResponse, false);
                        }
                        else
                        {
                            //var obj = [];
                            /*for(var key in gatewayResponse.statusList)
                            {
                                if (obj.hasOwnProperty(key))
                                {*/
                                  //obj[key] = gatewayResponse.statusList[key];
                                /*}
                            }*/
                            console.log("statusList",gatewayResponse.statusList) ;
                            // ParseJSON?
                            okFunction( gatewayResponse.statusList );

                        }
                    },
                    function(error)
                    {
                        console.log("Transaction Check Error " , error);
                        failFunction(error);
                        routerServiceErrorHandler(error, false);
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::sendApprovalItem error " , error);
                failFunction(error);
                routerServiceErrorHandler(error, false);
            }
        );
        /*this._doOAuthAuthentication( extendedActivationKey,
            function() {
                app.routerService.airRouter.putSync( "datafeed/approvals", update, item.id,
                    function(gatewayResponse, correlatedID)
                    {
                        console.log("Send result "+ gatewayResponse.result);
                        if (gatewayResponse.result != 'SUCCESS')
                        {
                            routerServiceErrorHandler( gatewayResponse, false, true );
                        }
                        else
                        {
                            console.log("Sent Correlated ID "+correlatedID);
                            okFunction( correlatedID, gatewayResponse.transactionId );
                        }
                    },
                    function(error)
                    {
                        console.log("Send Error " + error);
                        routerServiceErrorHandler(error, false, true);
                    }
                );
            },
            function (error) {
                console.log( "RouterServer::sendApprovalItem error " + error);
                routerServiceErrorHandler(error, false, true);
            }
        );*/
    }
}
function routerServiceEncode(txt) {
    //return "'"+encodeURIComponent(comment)+"'";
    return "'"+txt+"'";
}





