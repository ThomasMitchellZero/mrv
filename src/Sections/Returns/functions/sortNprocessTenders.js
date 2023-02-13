import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "./tenderStatusCodes";
import tenderizer from "./tenderizer";

import cloneDeep from "lodash.clonedeep";

const sortNprocessTenders = (tendersArr, failure = true) => {
  const untenderizedArr = cloneDeep(tendersArr)

  // Ensures all arr elements have correct tType-specific properties
  const unsortedTendersArr = untenderizedArr.map((thisTenderObj)=>{
    return tenderizer(thisTenderObj)
  });

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

  // TO-DO: this probably needs to be more logical.
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
