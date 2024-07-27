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
  7771: new Invoice_SR({
    invoNum: "7771",
    date: new Date(2022, 3, 8),
    payment: {
      [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
    },

    itemAtomsArr: [
      new returnAtom({
        atomItemNum: "100",
        atomItemQty: 8,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 4150,
        }),
      }),
      new returnAtom({
        atomItemNum: "300",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2415,
        }),
      }),
      new returnAtom({
        atomItemNum: "400",
        atomItemQty: 10,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 1315,
        }),
      }),
      new returnAtom({
        atomItemNum: "3333WW100",
        bifrostKey: "3333",
        parentKey: "100",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 514,
        }),
      }),
    ],
  }),

  7772: new Invoice_SR({
    invoNum: "7772",
    store: "2211",
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

  7773: new Invoice_SR({
    invoNum: "7773",
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

  7774: new Invoice_SR({
    invoNum: "7774",
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

  7775: new Invoice_SR({
    invoNum: "7775",
    date: new Date(2022, 3, 8),
    payment: {
      [tType.cash]: { tenderType: tType.cash, tenderLabel: "Cash", paid: 0 },
    },

    itemAtomsArr: [
      // The washer
      new returnAtom({
        atomItemNum: "20100",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 75000,
        }),
      }),
      // The dryer
      new returnAtom({
        atomItemNum: "20200",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 110000,
        }),
      }),
      // dryer clamp
      new returnAtom({
        atomItemNum: "20900",
        atomItemQty: 2,
        parentKey: "20200",
        atomMoneyObj: new moneyObj({
          unitBaseValue: 500,
        }),
      }),

      // dryer duct
      new returnAtom({
        atomItemNum: "20910",
        atomItemQty: 2,
        parentKey: "20200",
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2500,
        }),
      }),

      // washer hose
      new returnAtom({
        atomItemNum: "20920",
        atomItemQty: 2,
        parentKey: "20100",
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2000,
        }),
      }),

      // LPP
      new returnAtom({
        atomItemNum: "20333WW20100",
        bifrostKey: "20333",
        parentKey: "20100",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 5500,
        }),
      }),
    ],
  }),

  8881: new Invoice_SR({
    invoNum: "8881",
    store: 1234,
    date: new Date(2024, 3, 4),
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
        atomItemNum: "330",
        atomItemQty: 1,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2000,
        }),
      }),
      new returnAtom({
        atomItemNum: "550",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 1000,
        }),
      }),
    ],
  }),

  8882: new Invoice_SR({
    invoNum: "8882",
    store: 1234,
    date: new Date(2024, 2, 1),
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
        atomItemNum: "330",
        atomItemQty: 1,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2500,
        }),
      }),
    ],
  }),

  88883333: new Invoice_SR({
    invoNum: "88883333",
    store: 1234,
    date: new Date(2024, 2, 1),
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
        atomItemNum: "330",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2250,
        }),
      }),
      new returnAtom({
        atomItemNum: "440",
        atomItemQty: 2,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 15599,
        }),
      }),
      new returnAtom({
        atomItemNum: "550",
        atomItemQty: 4,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 1299,
        }),
      }),
      new returnAtom({
        atomItemNum: "660",
        atomItemQty: 7,
        atomMoneyObj: new moneyObj({
          unitBaseValue: 2250,
        }),
      }),
    ],
  }),

  ///////////////  Uses MoneyObj + Association     ////////////////////////////////
};

const InvoContext = React.createContext(invoiceObj);

export default InvoContext;
