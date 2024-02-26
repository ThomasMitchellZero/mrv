import React from "react";

import {
  Invoice_SR,
  InvoProduct,
  ProdClass,
  returnAtom,
  moneyObj,
} from "../globalFunctions/globalJS_classes";

import tenderTypes from "../components/global_functions/tenderTypes";

//products = 100, 200, 300, 400, 900, 910

const tType = tenderTypes;

const invoiceObj = {
  CAAA: new Invoice_SR({
    invoNum: "CAAA",
    date: new Date(2022, 3, 8),
    payment: {
      [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
    },
    itemAtomsArr: [
      new returnAtom({
        atomInvoNum: "CAAA",
        atomItemNum: "100",
        atomItemQty: 8,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 4150,
        }),
      }),
      new returnAtom({
        atomInvoNum: "CAAA",
        atomItemNum: "300",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2415,
        }),
      }),
      new returnAtom({
        atomInvoNum: "CAAA",
        atomItemNum: "400",
        atomItemQty: 10,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 1315,
        }),
      }),
    ],
  }),

  CBBB: new Invoice_SR({
    invoNum: "CBBB",
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
    itemAtomsArr: [
      new returnAtom({
        atomItemNum: "200",
        atomItemQty: 8,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 440,
        }),
      }),
      new returnAtom({
        atomItemNum: "900",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 98715,
        }),
      }),
    ],
  }),

  CCCC: new Invoice_SR({
    invoNum: "CCCC",
    store: 1234,
    date: new Date(2022, 2, 24),
    payment: {
      3333444433334444: {
        tenderType: tType.credit,
        tenderLabel: "American Express ****4444",
        paid: 0,
        ccNum: "3333444433334444",
      },
    },
    itemAtomsArr: [
      new returnAtom({
        atomItemNum: "200",
        atomItemQty: 16,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 415,
        }),
      }),
      new returnAtom({
        atomItemNum: "300",
        atomItemQty: 3,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2415,
        }),
      }),
    ],
  }),

  CDDD: new Invoice_SR({
    invoNum: "CCCC",
    store: 1234,
    date: new Date(2022, 4, 4),
    payment: {
      1111222211112222: {
        tenderType: tType.credit,
        tenderLabel: "MasterCard ****2222",
        paid: 0,
        ccNum: "1111222211112222",
      },
    },
    itemAtomsArr: [
      new returnAtom({
        atomItemNum: "200",
        atomItemQty: 1,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 463,
        }),
      }),
      new returnAtom({
        atomItemNum: "300",
        atomItemQty: 6,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2415,
        }),
      }),
      new returnAtom({
        atomItemNum: "400",
        atomItemQty: 1,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 102415,
        }),
      }),
    ],
  }),


  ///////////////  Uses MoneyObj + Association     ////////////////////////////////
};

const InvoContext = React.createContext(invoiceObj);

export default InvoContext;
