import React from "react";

import invoicePaymentPricer from "../global_functions/invoicePaymentPricer"

//products = 100, 200, 300, 400, 900, 910

const unpricedInvoiceObj = {
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      phone: "1112223333",
      payment: { cash: { paid: 0 } },
    },
    products: {
      100: { quantity: 8, price: 4150, tax: 380 },
      300: { quantity: 2, price: 2415, tax: 180 },
      400: { quantity: 10, price: 1315, tax: 120 },
    },
  },

  BBB: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 22),
      payment: {
        check: {
          paid: 0,
          routing: "12341234",
          account: "43214321",
        },
        creditCard: {
          paid: 0,
          ccNum: "1111222211112222",
        },
      },
    },
    products: {
      200: { quantity: 8, price: 4400, tax: 410 },
      900: { quantity: 1, price: 98715, tax: 9100 },
    },
  },

  CCC: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 24),
      payment: {
        creditCard: {
          paid: 0,
          ccNum: "3333444433334444",
        },
      },
    },
    products: {
      200: { quantity: 16, price: 4415, tax: 402 },
      300: { quantity: 3, price: 2415, tax: 240 },
    },
  },
  DDD: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 4, 13),
      payment: { cash: { paid: 0 } },
    },
    products: {
      300: { quantity: 6, price: 2415, tax: 216 },
      400: { quantity: 1, price: 102415, tax: 9821 },
    },
  },
  EEE: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 2, 11),
      payment: { cash: { paid: 0 } },
      phone: "1112223333",
    },
    products: {
      100: { quantity: 4, price: 815, tax: 86 },
    },
  },

  FFF: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 3, 8),
      payment: { cash: { paid: 0 } },
      orderNum: "11112222",
      lcaNum: "11112222",
      proIdNum: "11112222",
    },

    products: {
      100: { quantity: 10, price: 5615, tax: 80 },
      300: { quantity: 8, price: 2555, tax: 2.10 },
      400: { quantity: 1, price: 102105, tax: 9821 },
    },
  },
}

const pricedInvoiceObj = invoicePaymentPricer(unpricedInvoiceObj)


const InvoiceContext = React.createContext(pricedInvoiceObj);

export default InvoiceContext;
