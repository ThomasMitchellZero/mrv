import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "./tenderStatusCodes";

const ref = [
  {primaryKey: tType.cash, tenderType: tType.cash, tenderLabel: "Cash", paid: 800 },
  {primaryKey: tType.storeCredit, tenderType: tType.storeCredit, tenderLabel: "storeCredit", paid: 900 },
  {
   primaryKey: "7777888877778888",
   tenderType: tType.debit,
   tenderLabel: "Debit ****8888",
   paid: 1456,
   debitNum: "7777888877778888",
   },
   {
   primaryKey: "1111222211112222",
   tenderType: tType.credit,
   tenderLabel: "MasterCard ****2222",
   paid: 12345,
   ccNum: "1111222211112222",
   },
   {
   primaryKey: "3333444433334444",
   tenderType: tType.credit,
   tenderLabel: "American Express ****4444",
   paid: 8754,
   ccNum: "3333444433334444",
   },
   {
   primaryKey: "44443333",
   tenderType: tType.check,
   tenderLabel: "Check ****3333",
   paid: 55,
   routingNum: "44443333",
   accountNum: "33334444",
 },
];


const tenderizer = (tenderObj) => {

  // remember that the tenderizer will be called on some tenderObj's that have already been Tenderized.

  const blurNumber = (inputNum)=>{
    const last4 = `${inputNum}`.slice(-4)
    const outString = `**** ${last4}`
    return outString
  }


  // ---- UNIVERSAL PROPERTIES ----
  const sharedProperties = {
    // Keep status if tender already has one.  
    status: tenderObj.status ?? tStatus.notStarted,
    displayPaid: Number(tenderObj.paid / 100).toFixed(2),
  };


  // ---- TYPE-SPECIFIC PROPERTIES ----

  // tenderType never changes once assigned
  const typePaths = {
    [tType.cash]: {
      tenderLabel: "Cash",
    },
    [tType.storeCredit]: {
      tenderLabel: "Store Credit",
    },
    [tType.credit]: {
      tenderLabel: `Credit Card ${blurNumber(tenderObj.primaryKey)}`,
    },
    [tType.check]: {
      tenderLabel: `Checking ${blurNumber(tenderObj.primaryKey)}`,
    },
    [tType.debit]: {
      tenderLabel: `Debit ${blurNumber(tenderObj.primaryKey)}`,
    },
  };


  const outTenderObj = {
    ...tenderObj,
    ...sharedProperties,
    ...typePaths[tenderObj.tenderType],
  };

  return outTenderObj;
};

export default tenderizer;
