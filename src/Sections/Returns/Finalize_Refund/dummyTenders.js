import tenderizer from "../functions/tenderizer";

const dummyArr = Object.entries({
  cash: { tenderType: "cash", tenderLabel: "Cash", paid: 800 },
  storeCredit: { tenderType: "storeCredit", tenderLabel: "storeCredit", paid: 900 },
  7777888877778888: {
    tenderType: "debit",
    tenderLabel: "Debit ****8888",
    paid: 1456,
    debitNum: "7777888877778888",
  },
  1111222211112222: {
    tenderType: "credit",
    tenderLabel: "MasterCard ****2222",
    paid: 12345,
    ccNum: "1111222211112222",
  },
  3333444433334444: {
    tenderType: "credit",
    tenderLabel: "American Express ****4444",
    paid: 8754,
    ccNum: "3333444433334444",
  },
  44443333: {
    tenderType: "check",
    tenderLabel: "Check ****3333",
    paid: 55,
    routingNum: "44443333",
    accountNum: "33334444",
  },
});

const debitOnly = {
  tenderType: "debit",
  7777888877778888: {
    tenderLabel: "Debit ****8888",
    paid: 1456,
    debitNum: "7777888877778888",
  },
};

const dummyTenders = {};

for (const arrItem of dummyArr) {
  dummyTenders[arrItem[0]] = tenderizer(arrItem[0], arrItem[1]);
}

console.log(dummyTenders);

export default dummyTenders;
