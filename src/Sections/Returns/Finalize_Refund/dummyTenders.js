import tenderizer from "../functions/tenderizer";

const dummyArr = Object.entries({
  cash: { tenderLabel: "Cash", paid: 0 },
  7777888877778888: {
    tenderLabel: "Debit ****8888",
    paid: 0,
    debitNum: "7777888877778888",
  },
});

const dummyTenders = {};

for (const arrItem of dummyArr) {
  dummyTenders[arrItem[0]] = tenderizer(arrItem[0], arrItem[1]);
}

console.log(dummyTenders);

export default dummyTenders;
