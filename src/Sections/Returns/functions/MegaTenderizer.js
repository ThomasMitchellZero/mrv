import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "./tenderStatusCodes";
import MessageRibbon from "../../../components/UI/DisplayOutputs/MessageRibbon";

const ref = [
  {
    primaryKey: tType.cash,
    tenderType: tType.cash,
    tenderLabel: "Cash",
    paid: 800,
  },
  {
    primaryKey: tType.storeCredit,
    tenderType: tType.storeCredit,
    tenderLabel: "storeCredit",
    paid: 900,
  },
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

// remember that the tenderizer will be called on some tenderObj's that have already been Tenderized.

// Populates a tender with all relevant properties based on Status and Type
const tenderizer = (tenderObj, totalFailure = true) => {
  const currentStatus = tenderObj.status ?? tStatus.notStarted;

  const startingStatusPaths = {
    [tStatus.notStarted]: {
      [tType.cash]: "",
      [tType.check]: "",
      [tType.credit]: "",
      [tType.debit]: "",
      [tType.storeCredit]: "",
    },
  };

  // ---- UNIVERSAL PROPERTIES ----

  const sharedProperties = {
    // Keep status if tender already has one.
    status: tenderObj.status ?? tStatus.notStarted,
    userOption: null,
    displayPaid: Number(tenderObj.paid / 100).toFixed(2),
  };

  let outTenderObj = {
    ...tenderObj,
    ...sharedProperties,
  };

  // ---- TYPE-SPECIFIC PROPERTIES ----

  // tenderType never change once assigned
  const typePaths = {
    [tType.cash]: {
      tenderLabel: "CasH MONEY",
    },
    [tType.storeCredit]: {
      tenderLabel: "STOOOORE Credit",
    },
    [tType.credit]: {
      tenderLabel: "Credit Cartttt",
    },
    [tType.check]: {
      tenderLabel: "Check Down",
    },
    [tType.debit]: {
      tenderLabel: "Debitator",
    },
  };

  // ---- STATUS-BASED PROPERTIES ----

  const swapLabel = "";

  const statusPaths = {
    [tStatus.notStarted]: {
      icon: "notStarted",
      statusLabel: "Not Started",
    },
    [tStatus.inProgress]: {
      icon: "inProgress",
      active: true,
      statusLabel: "In Progress",
    },
    [tStatus.progress2Line]: {
      icon: "inProgress",
      line2: true,
      strike: true,
      statusLabel: "In Progress",
    },
    [tStatus.failure]: {
      icon: "failure",
      statusLabel: "Auto Credit Failed",
      active: true,
    },
    [tStatus.failureCash]: {
      icon: "failure",
      line2: true,
      strike: true,
      statusLabel: "Auto Credit Failed",
    },
    [tStatus.complete]: {
      icon: "complete",
      statusLabel: "Complete",
    },
    [tStatus.swapped]: {
      icon: "complete",
      strike: true,
      statusLabel: `Refunding as ${swapLabel}`,
    },
  };

  // ---- STATUS + TYPE - BASED PROPERTIES ----

  const failCheck = totalFailure
    ? { nextStatus: tStatus.failure, panel70: "failure" }
    : { nextStatus: tStatus.complete, panel70: null };

  const typeAndStatusPaths = {
    [tStatus.notStarted]: {
      [tType.credit]: {
        ...failCheck
      },
      [tType.check]: {
        nextStatus: tStatus.progress2Line,
      },
      [tType.debit]: {
        nextStatus: tStatus.inProgress,
        panel70: { type: "userChoice" },
      },
      [tType.storeCredit]: {
        nextStatus: tStatus.inProgress,
        panel70: { type: "finishStoreCredit" },
      },
      [tType.cash]: {
        nextStatus: tStatus.inProgress,
        panel70: { type: "finishCash" },
      },
    },
  };

  return outTenderObj;
};

export default tenderizer;
