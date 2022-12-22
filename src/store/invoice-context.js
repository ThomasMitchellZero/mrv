import React from "react";

const [cash, inStoreCredit, applePay, payPal, check] = [
  "Cash",
  "In-Store Credit",
  "ApplePay",
  "PayPal",
  "Check",
];

//products = 100, 200, 300, 400, 900, 910

const InvoiceContext = React.createContext({
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      payment: cash,
    },
    products: {
      100: { quantity: 8, price: 41.50, tax: 3.80 },
      300: { quantity: 2, price: 24.15, tax: 1.80 },
      400: { quantity: 10, price: 13.15, tax: 1.20 },
    },
  },

  BBB: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 22),
      payment: check,
    },
    products: {
      200: { quantity: 8, price: 44.00, tax: 4.10 },
      900: { quantity: 1, price: 987.15, tax: 91.00 },
    },
  },

  CCC: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 24),
      payment: check,
    },
    products: {
      200: { quantity: 99, price: 44.15, tax: 4.02 },
      //300: { quantity: 99, price: 24.15 },
    },
  },
  DDD: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 4, 13),
      payment: check,
    },
    products: {
      300: { quantity: 99, price: 24.15, tax: 2.10 },
      400: { quantity: 1, price: 1024.15, tax: 98.21 },
    },
  },
  EEE: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 2, 11),
      payment: check,
    },
    products: {
      100: { quantity: 99, price: 8.15, tax: 0.80 },
    },
  },


});

export default InvoiceContext;
