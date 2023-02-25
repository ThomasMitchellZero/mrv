import tenderizer from "../Sections/Returns/functions/tenderizer";

import tenderTypes from "../components/global_functions/tenderTypes";

const tType = tenderTypes

const dummyObj = {
  cash: { tenderType: tType.cash, tenderLabel: "Cash", paid: 800 },
  storeCredit: { tenderType: tType.storeCredit, tenderLabel: "storeCredit", paid: 900 },
  7777888877778888: {
    tenderType: tType.debit,
    tenderLabel: "Debit ****8888",
    paid: 1456,
    debitNum: "7777888877778888",
  },
  1111222211112222: {
    tenderType: tType.credit,
    tenderLabel: "MasterCard ****2222",
    paid: 12345,
    ccNum: "1111222211112222",
  },
  3333444433334444: {
    tenderType: tType.credit,
    tenderLabel: "American Express ****4444",
    paid: 8754,
    ccNum: "3333444433334444",
  },
  44443333: {
    tenderType: tType.check,
    tenderLabel: "Check ****3333",
    paid: 55,
    routingNum: "44443333",
    accountNum: "33334444",
  },
};

const debitOnly = {

  7777888877778888: {
    tenderType: tType.debit,
    tenderLabel: "Debit ****8888",
    paid: 1456,
    debitNum: "7777888877778888",
  },
};

const dummyTenders = {};

for (const arrItem of Object.entries(dummyObj)) {
  dummyTenders[arrItem[0]] = tenderizer(arrItem[1]);
}

export default dummyTenders;
