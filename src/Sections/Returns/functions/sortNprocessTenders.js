import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "./tenderStatusCodes";

import cloneDeep from "lodash.clonedeep";

const sortNprocessTenders = (tendersArr, failure = true) => {
  const unsortedTendersArr = cloneDeep(tendersArr);
  let newIndex = 0;

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

  for (newIndex; newIndex < unsortedTendersArr.length; newIndex++) {
    // these should be ONLY tender statuses that are changed without user input.
    if (sortedTenders[newIndex].userOption) {
      // 
      sortedTenders[newIndex].status = tStatus.inProgress;
      break;
    } else if (sortedTenders[newIndex].canFail && failure) {
      sortedTenders[newIndex].status = tStatus.failure;
      break;
    } else if (sortedTenders[newIndex].status === tStatus.notStarted){
      sortedTenders[newIndex].status = tStatus.complete;
    }
  }

  const newTendersPack ={
    activeIndex: newIndex,
    tendersArr: sortedTenders
  }

  return newTendersPack;
};

export default sortNprocessTenders;
