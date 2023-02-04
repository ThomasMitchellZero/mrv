import tenderTypes from "../../../components/global_functions/tenderTypes";
import tenderStatusCodes from "./tenderStatusCodes";

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

// if I want, I can generate the tender labels in the Tenderizer.

const tenderizer = (tenderObj) => {
  // properties that all tenders will have.  Needed b/c we will be assigning these in the state.
  const sharedProperties = {
    status: "notStarted",
    userChoice: tType.storeCredit
  };

  let typeProps = {};

  switch (tenderObj.tenderType) {
    case tType.cash:
      typeProps = { tenderLabel: "CasH MONEY" };
      break;

    case tType.storeCredit:
      typeProps = { tenderLabel: "STOOOORE Credit" };
      break;

    case tType.credit:
      typeProps = {tenderLabel:"Credit Cartttt" };

      break;

    case tType.debit:
      typeProps = {tenderLabel:"Debitater"};
      break;

    case tType.check:
      typeProps = {tenderLabel:"You old AF"};
      break;

    default:
      throw new Error(`Unknown tender type: ${tenderObj.tenderType}`);
  }

  const outTenderObj = {
    ...tenderObj,
    ...sharedProperties,
    ...typeProps,
  };

  return outTenderObj;
};

export default tenderizer;
