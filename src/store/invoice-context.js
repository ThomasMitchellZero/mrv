import React from "react";

import invoicePaymentPricer from "../components/global_functions/invoicePaymentPricer";

//products = 100, 200, 300, 400, 900, 910

const invoiceObj = {
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      phone: "1112223333",
      payment: {
        cash: { tenderLabel: "Cash", paid: 0 },
        7777888877778888: {
          tenderLabel: "Debit ****8888",
          paid: 0,
          debitNum: "7777888877778888",
        },
      },
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
        1111222211112222: {
          tenderLabel: "MasterCard ****2222",
          paid: 0,
          ccNum: "1111222211112222",
        },
      },
    },
    products: {
      200: { quantity: 8, price: 4400, tax: 410 },
      900: { quantity: 2, price: 98715, tax: 9100 },
    },
  },

  CCC: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 24),
      payment: {
        3333444433334444: {
          tenderLabel: "American Express ****4444",
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
      payment: {
        1111222211112222: {
          tenderLabel: "MasterCard ****2222",
          paid: 0,
          ccNum: "1111222211112222",
        },
      },
    },
    products: {
      200: { quantity: 1, price: 4613, tax: 412 },
      300: { quantity: 6, price: 2415, tax: 216 },
      400: { quantity: 1, price: 102415, tax: 9821 },
    },
  },
  EEE: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 2, 11),
      payment: {
        44443333: {
          tenderLabel: "Check ****3333",
          paid: 0,
          routingNum: "44443333",
          accountNum: "33334444",
        },
      },
      phone: "1112223333",
    },
    products: {
      100: { quantity: 4, price: 8815, tax: 863 },
    },
  },

  FFF: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 3, 8),
      payment: { cash: { tenderLabel: "Cash", paid: 0 } },
      orderNum: "11112222",
      lcaNum: "11112222",
      proIdNum: "11112222",
    },

    products: {
      100: { quantity: 10, price: 5615, tax: 80 },
      300: { quantity: 8, price: 2555, tax: 2.1 },
      400: { quantity: 1, price: 102105, tax: 9821 },
    },
  },
};

invoicePaymentPricer(invoiceObj);

const InvoiceContext = React.createContext(invoiceObj);

export default InvoiceContext;
