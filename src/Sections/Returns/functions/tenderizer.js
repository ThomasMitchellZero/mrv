import tenderTypes from "../../../components/global_functions/tenderTypes";
import tenderStatusCodes from "./tenderStatusCodes";
import MessageRibbon from "../../../components/UI/DisplayOutputs/MessageRibbon";

const ref = {
  // Cash
  cash: { tenderLabel: "Cash", paid: 0 },

  // creditCard
  1111222211112222: {
    tenderLabel: "MasterCard ****2222",
    paid: 0,
    ccNum: "1111222211112222",
  },

  // Check
  44443333: {
    tenderLabel: "Check ****3333",
    paid: 0,
    routingNum: "44443333",
    accountNum: "33334444",
  },

  // Debit
  7777888877778888: {
    tenderLabel: "Debit ****8888",
    paid: 0,
    debitNum: "7777888877778888",
  },

  // Store Credit
  storeCredit: {
    paid: 0,
  },
};

const tType = tenderTypes;
const tStatus = tenderStatusCodes;

// the Tenderizer takes gets a tender type and populates it with the additional type-specific properties.  It deals ONLY with an individual tender.

const tenderizer = (tenderObj) => {
  // properties that all tenders will have.  Needed b/c we will be assigning these in the state.

  const sharedProperties = {
    status: tStatus.notStarted,
  };

  const errorProperties = {
    errorMsg: (
      <MessageRibbon
        color="red"
        text={`refund to ${tenderObj.tenderType} failed.  Process refund to Store Credit`}
      />
    ),
  };

  let outTenderObj = {
    ...tenderObj,
    ...sharedProperties,
  };

  switch (tenderObj.tenderType) {
    case tType.cash:
      outTenderObj = { ...outTenderObj, tenderLabel: "CasH MONEY", ui70: "" };
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
