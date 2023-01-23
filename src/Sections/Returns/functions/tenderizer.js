import tenderTypes from "../../../components/global_functions/tenderTypes";

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
// if I want, I can generate the tender labels in the Tenderizer.

const ref_processStatus = {
  notStarted: null,
  inProgress: null,
  complete: null,
  failure: null,
};

const tenderizer = (tenderObj) => {
  switch (tenderObj.tenderType) {
    case tType.cash:
      return {
        ...tenderObj,
        tenderLabel: "CasH MONEY",
        processStatus: "notStarted",
      };

    case tType.storeCredit:
      return {
        ...tenderObj,
        tenderLabel: "STOOOORE Credit",
        processStatus: "notStarted",
      };

    case tType.credit:
      return {
        ...tenderObj,
        tenderLabel: "Credit Cartttt",
        processStatus: "notStarted",
      };

    case tType.debit:
      return {
        ...tenderObj,
        tenderLabel: "Debitater",
        processStatus: "notStarted",
      };

    case tType.check:
      return {
        ...tenderObj,
        tenderLabel: "You old AF",
        processStatus: "notStarted",
      };

    default:
      throw new Error(`Unknown tender type: ${tenderObj.tenderType}`);
  }
};

export default tenderizer;
