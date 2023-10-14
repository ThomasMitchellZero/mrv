import React from "react";

import invoicePaymentPricer from "../components/global_functions/invoicePaymentPricer";

import {
  Invoice_SR,
  InvoProduct,
  ProdClass,
} from "../globalFunctions/globalJS_classes";

import tenderTypes from "../components/global_functions/tenderTypes";

//products = 100, 200, 300, 400, 900, 910

const tType = tenderTypes;

const invoiceObj = {
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      phone: "1112223333",
      payment: {
        [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
        7777888877778888: {
          tenderType: tType.debit,
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
          tenderType: tType.credit,
          tenderLabel: "MasterCard ****2222",
          paid: 0,
          ccNum: "1111222211112222",
        },
      },
    },
    products: {
      200: { quantity: 8, price: 440, tax: 40 },
      900: { quantity: 2, price: 98715, tax: 9100 },
    },
  },

  CCC: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 24),
      payment: {
        3333444433334444: {
          tenderType: tType.credit,
          tenderLabel: "American Express ****4444",
          paid: 0,
          ccNum: "3333444433334444",
        },
      },
    },
    products: {
      200: { quantity: 16, price: 415, tax: 42 },
      300: { quantity: 3, price: 2415, tax: 240 },
    },
  },

  DDD: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 4, 13),
      payment: {
        1111222211112222: {
          tenderType: tType.credit,
          tenderLabel: "MasterCard ****2222",
          paid: 0,
          ccNum: "1111222211112222",
        },
      },
    },
    products: {
      200: { quantity: 1, price: 463, tax: 41 },
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
          tenderType: tType.check,
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
      payment: {
        [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
      },
      orderNum: "11112222",
      lcaNum: "11112222",
      proIdNum: "11112222",
    },

    products: {
      100: { quantity: 10, price: 5615, tax: 80 },
      300: { quantity: 8, price: 2555, tax: 21 },
      400: { quantity: 1, price: 102105, tax: 9821 },
    },
  },

  SSS: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 3, 8),
      payment: {
        [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
      },
      orderNum: "33334444",
      genericSOS: true,
    },

    products: {
      10001: { quantity: 2, price: 7766, tax: 720, delivery: "delivered" },
      10002: { quantity: 6, price: 234, tax: 22, delivery: "delivered" },
      10003: { quantity: 3, price: 6012, tax: 601, delivery: "due" },
    },
  },

  53451: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 3, 8),
      payment: {
        [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
      },

      orderNum: "33334444",
      genericSOS: true,
    },

    products: {
      10001: { quantity: 2, price: 7766, tax: 720, delivery: "delivered" },
      10002: { quantity: 6, price: 234, tax: 22, delivery: "delivered" },
      10003: { quantity: 3, price: 6012, tax: 601, delivery: "due" },
    },
  },

  XBBB: new Invoice_SR({
    date: new Date(2022, 3, 8),
    payment: {
      [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
    },
    products: {
      9900: new InvoProduct({
        prodClass: ProdClass({ mainItem: true }),
        quantity: 2,
        price: 103115,
        tax: 11033,
        childItemsObj: {
          100001: {
            prodClass: ProdClass({ accessory: true }),
            quantity: 2,
            price: 800,
            tax: 79,
          },
        },
      }),

      9910: new InvoProduct({
        prodClass: ProdClass({ mainItem: true }),
        quantity: 2,
        price: 99877,
        tax: 9776,
        childItemsObj: {
          3333: new InvoProduct({
            prodClass: ProdClass({ lpp_3yr: true }),
            quantity: 1,
            price: 4500,
            tax: 500,
          }),
          100001: {
            prodClass: ProdClass({ accessory: true }),
            quantity: 2,
            price: 800,
            tax: 79,
          },
        },
      }),

      400: new InvoProduct({
        prodClass: ProdClass({ mainItem: true }),
        quantity: 2,
        price: 40700,
        tax: 4066,
      }),
    },
  }),

  XAAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 3, 8),
      payment: {
        44443333: {
          tenderType: tType.check,
          tenderLabel: "Check ****3333",
          paid: 0,
          routingNum: "44443333",
          accountNum: "33334444",
        },
      },
      orderNum: "X11111111",
    },

    products: {
      900: { quantity: 2, price: 103115, tax: 11030 },
      910: { quantity: 1, price: 91234, tax: 9120 },
      400: { quantity: 1, price: 38723, tax: 3810 },
    },
  },
};

invoicePaymentPricer(invoiceObj);

const InvoiceContext = React.createContext(invoiceObj);

export default InvoiceContext;
