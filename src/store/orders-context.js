import React from "react";

import invoicePaymentPricer from "../components/global_functions/invoicePaymentPricer";

import tenderTypes from "../components/global_functions/tenderTypes";

import { Order } from "../globalFunctions/globalJS_classes";
//products = 100, 200, 300, 400, 900, 910

/*

*/

const ordersObj = {
  X11111111: new Order({
    invoice: "XAAA",
    email: "snow.white@apple.com",
    street: "1600 Pennsylvania Ave",
    city: "Washington",
    state: "DC",
    zip: "20001",
  }),
};

const OrdersContext = React.createContext(ordersObj);

export default OrdersContext;
