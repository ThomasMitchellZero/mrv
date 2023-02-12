import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "./tenderStatusCodes";

import cloneDeep from "lodash.clonedeep";

const sortNprocessTenders = (tendersPack, failure = true) => {
  const unsortedTendersArr = cloneDeep(tendersPack.tenderArr);
  let newIndex = tendersPack.activeIndex;

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
    if (sortedTenders[newIndex].userOption) {
      sortedTenders[newIndex].status = tStatus.inProgress;
      break;
    } else if (sortedTenders[newIndex].canFail && failure) {
      sortedTenders[newIndex].status = tStatus.failure;
      break;
    } else {
      sortedTenders[newIndex].status = tStatus.com;
    }
  }

  const newTendersPack ={
    activeIndex: newIndex,
    tendersArr: sortedTenders
  }

  return newTendersPack;
};

export default sortNprocessTenders;
