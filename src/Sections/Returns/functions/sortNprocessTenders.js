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

// ---- Process transformations of the tenders.

  const failCheck = () => {
    const outStatus = totalFailure ? tStatus.failure : tStatus.complete;
    return outStatus;
  };

  //These status/type combos auto-resolve to pre-determined statuses.
  const autoResolvingPaths = {
    [tStatus.notStarted]: {
      [tType.credit]: {
        status: failCheck(),
      },
      [tType.check]: {
        status: tStatus.inProgress,
      },
      [tType.debit]: {
        status: tStatus.inProgress,
      },
      [tType.storeCredit]: {
        status: tStatus.inProgress,
      },
      [tType.cash]: {
        status: tStatus.inProgress,
      },
    },
    [tStatus.complete]:{
      [tType.debit]: {
        status: failCheck()
      },
      [tType.check]: {
        status: failCheck()
      },
    }
  };

  //Loop through sorted Tenders
  for (
    outActiveIndex;
    outActiveIndex < sortedTenders.length;
    outActiveIndex++
  ) {
    const thisTenderObj = sortedTenders[outActiveIndex];
    const thisStatus = thisTenderObj.status;
    const thisType = thisTenderObj.tenderType;
    const transformedStatus = autoResolvingPaths[thisStatus]?.[thisType]

    // If this status/type combo has a pre-determined status change...
    if (transformedStatus) {
      // make that status change in the current active index.
      sortedTenders[outActiveIndex] = {
        ...thisTenderObj,
        ...transformedStatus
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
