import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "./tenderStatusCodes";
import tenderizer from "./tenderizer";

import cloneDeep from "lodash.clonedeep";

const sortNprocessTenders = (tendersArr, totalFailure = true) => {
  const untenderizedArr = cloneDeep(tendersArr);
  console.log(untenderizedArr);

  // Ensures all arr elements have correct tType-specific properties
  const unsortedTendersArr = untenderizedArr.map((thisTenderObj) => {
    // It's OK to Tenderize at the start because tenderType never changes.
    return tenderizer(thisTenderObj);
  });

  let outActiveIndex = 0;

  // tender types, in the order they should be processed.
  let sortedTenders = [
    ...unsortedTendersArr.filter((thisTender) => {
      return thisTender.tenderType === tType.credit;
    }),
    ...unsortedTendersArr.filter((thisTender) => {
      return thisTender.tenderType === tType.debit;
    }),
    ...unsortedTendersArr.filter((thisTender) => {
      return thisTender.tenderType === tType.check;
    }),
    ...unsortedTendersArr.filter((thisTender) => {
      return thisTender.tenderType === tType.storeCredit;
    }),
    ...unsortedTendersArr.filter((thisTender) => {
      return thisTender.tenderType === tType.cash;
    }),
  ];

  //---- LOOP THROUGH AND CONDITIONALLY CHANGE STATE ----

  const failCheck = totalFailure
    ? { status: tStatus.failure, panel70: "failure" }
    : { status: tStatus.complete, panel70: null };

  const initalStatusPaths = {
    [tType.credit]: {
      ...failCheck,
    },
    [tType.check]: {
      status: tStatus.inProgress,
      panel70: { type: "userChoice" },
    },
    [tType.debit]: {
      status: tStatus.inProgress,
      panel70: { type: "userChoice" },
    },
    [tType.storeCredit]: {
      status: tStatus.inProgress,
      panel70: { type: "finishStoreCredit" },
    },
    [tType.cash]: {
      status: tStatus.inProgress,
      panel70: { type: "finishCash" },
    },
  };

  //

  for (
    outActiveIndex;
    outActiveIndex < sortedTenders.length;
    outActiveIndex++
  ) {
    const thisTenderObj = sortedTenders[outActiveIndex];
    const thisStatus = thisTenderObj.status;
    const thisType = thisTenderObj.tenderType;

    // Only auto-resolve notStarted tenders. Other changes come from user input.
    if (thisStatus === tStatus.notStarted) {
      sortedTenders[outActiveIndex] = {
        ...thisTenderObj,
        ...initalStatusPaths[thisType],
      };
    }

    // Only tenders with these statuses count as complete.
    const newStatus = sortedTenders[outActiveIndex].status;
    const isComplete =
      newStatus === tStatus.complete || newStatus === tStatus.swapped;

    if (!isComplete) {
      // incomplete means we need more input, so stop looping.
      break;
    }
  }

  const newTendersPack = {
    activeIndex: outActiveIndex,
    tendersArr: sortedTenders,
  };

  return newTendersPack;
};

export default sortNprocessTenders;


/*


*/
