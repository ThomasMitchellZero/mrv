import React from "react";

//products = 100, 200, 300, 400, 900, 910

const InvoiceContext = React.createContext({
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      phone: 1112223333,
      payment: { cash: { paid: 0 } },
    },
    products: {
      100: { quantity: 8, price: 41.5, tax: 3.8 },
      300: { quantity: 2, price: 24.15, tax: 1.8 },
      400: { quantity: 10, price: 13.15, tax: 1.2 },
    },
  },

  BBB: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 22),
      payment: {
        check: {
          paid: 0,
          routing: 12341234,
          account: 43214321,
        },
        creditCard: {
          paid: 0,
          ccNum: 1111222211112222,
        },
      },
    },
    products: {
      200: { quantity: 8, price: 44.0, tax: 4.1 },
      900: { quantity: 1, price: 987.15, tax: 91.0 },
    },
  },

  CCC: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 24),
      payment: {
        creditCard: {
          paid: 0,
          ccNum: 3333444433334444,
        },
      },
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
      payment: { cash: { paid: 0 } },
    },
    products: {
      300: { quantity: 99, price: 24.15, tax: 2.1 },
      400: { quantity: 1, price: 1024.15, tax: 98.21 },
    },
  },
  EEE: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 2, 11),
      payment: { cash: { paid: 0 } },
    },
    products: {
      100: { quantity: 99, price: 8.15, tax: 0.8 },
    },
  },

  FFF: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 3, 8),
      payment: { cash: { paid: 0 } },
      orderNum: 11112222,
      lcaNum: 11112222,
      proIdNum: 11112222,
    },

    products: {
      100: { quantity: 10, price: 8.15, tax: 0.8 },
      300: { quantity: 8, price: 25.55, tax: 2.1 },
      400: { quantity: 1, price: 1021.05, tax: 98.21 },
    },
  },
});

export default InvoiceContext;
