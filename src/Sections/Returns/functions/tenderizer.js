import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "./tenderStatusCodes";
import MessageRibbon from "../../../components/UI/DisplayOutputs/MessageRibbon";

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

  // properties that all tenders will have.
  const sharedProperties = {
    // Keep status if tender already has one.  
    status: tenderObj.status ?? tStatus.notStarted,
    userOption: null,
    displayPaid: Number(tenderObj.paid / 100).toFixed(2),
  };

  // 
  const errorProperties = {
    errorMsg: (
      <MessageRibbon
        color="red"
        text={`refund to ${tenderObj.tenderType} failed.  Process refund to Store Credit`}
      />
    ),
    canFail: true,
  };

  let outTenderObj = {
    ...tenderObj,
    ...sharedProperties,
  };

  // tenderType should never change once assigned
  
  switch (tenderObj.tenderType) {
    case tType.cash:
      outTenderObj = { ...outTenderObj, tenderLabel: "CasH MONEY", };
      break;

    case tType.storeCredit:
      outTenderObj = { ...outTenderObj, tenderLabel: "STOOOORE Credit" };
      break;

    case tType.credit:
      outTenderObj = {
        ...outTenderObj,
        ...errorProperties,
        tenderLabel: "Credit Cartttt",

        
      };
      break;

    case tType.debit:
      outTenderObj = {
        ...outTenderObj,
        ...errorProperties,
        tenderLabel: "Debitater",
        userOption:[1],
      };
      break;

    case tType.check:
      outTenderObj = {
        ...outTenderObj,
        ...errorProperties,
        tenderLabel: "You old AF",
      };
      break;

    default:
      throw new Error(`Unknown tender type: ${tenderObj.tenderType}`);
  }

  return outTenderObj;
};

export default tenderizer;
