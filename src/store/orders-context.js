import React from "react";

import invoicePaymentPricer from "../components/global_functions/invoicePaymentPricer";

import tenderTypes from "../components/global_functions/tenderTypes";

//products = 100, 200, 300, 400, 900, 910

const tType = tenderTypes;

const ordersObj = {
  "X11111111":{
    invoice: "XAAA",
    contact: {
      email: "snow.white@apple.com"
    },
    deliveryAddress:{
      street: "1600 Pennsylvania Avenue",
      city: "Washington",
      state: "DC",
      zip: "20001"
    },
    deliveryInstructions:"Leave it on the doorstep and get the hell outta here."
  }

};




const OrdersContext = React.createContext(ordersObj);

export default OrdersContext;
