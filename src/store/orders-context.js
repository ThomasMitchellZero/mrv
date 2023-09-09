import React from "react";


import { Order_SR } from "../globalFunctions/globalJS_classes";
//products = 100, 200, 300, 400, 900, 910

/*

*/

const ordersObj = {
  X11111111: new Order_SR({
    invoice: "XBBB",
    email: "snow.white@apple.com",
    street: "1600 Pennsylvania Ave",
    city: "Washington",
    state: "DC",
    zip: "20001",
  }),
};

const OrdersContext = React.createContext(ordersObj);

export default OrdersContext;
