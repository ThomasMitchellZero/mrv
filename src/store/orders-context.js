import React from "react";

import invoicePaymentPricer from "../components/global_functions/invoicePaymentPricer";

import tenderTypes from "../components/global_functions/tenderTypes";

import { saleRecordTypes } from "../Sections/Exchanges/_Resources/glossary/glossaryExch";

//products = 100, 200, 300, 400, 900, 910

const tType = tenderTypes;

class salesRecord {
  constructor({ key, string }) {
    this.k = key;
    this.str = string;
  }
}

class Order {
  constructor({
    invoice = "",
    email = "",
    street = "",
    city = "",
    state = "",
    zip = "",
  }) {
    this.salesRecordType = saleRecordTypes.order.k;
    this.invoice = invoice;
    this.contact = {
      email: email,
    }
    this.deliveryAddress = {
      street: street,
      city: city,
      state: state,
      zip: zip
    }
  }
}

const ordersObj = {
  X11111111: new Order({
    invoice: "XAAA",
    email: "snow.white@apple.com",
    street: "1600 Pennsylvania Ave",
    city: "Washington",
    state: "DC",
    zip:"20001",
  })
};

const OrdersContext = React.createContext(ordersObj);

export default OrdersContext;
