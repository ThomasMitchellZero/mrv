import classes from "./FinalizeRefund.module.css";

import tenderSort from "../functions/tenderSort";
import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "../functions/tenderStatusCodes";

// Shared Components
import TenderBadges from "./TenderBadges";
import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TenderTypesLI from "./TenderTypesLI";
import InPageTitleBox from "../../../components/UI/DisplayOutputs/InPageTitleBox";
import MessageRibbon from "../../../components/UI/DisplayOutputs/MessageRibbon";

//70 Panels
import UserInput70 from "./Finalize70panels/UserInput70";
import ConfirmCash70 from "./Finalize70panels/ConfirmCash70";
import Payout70 from "./Finalize70panels/Payout70";

import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

const FinalizeRefund = () => {
  // local state
  const initialState = { activeIndex: 0 };
  const [finalizerState, setFinalizerState] = useState(initialState);

  // Returns state
  const ctxTenders = useOutletContext().session.refunds_by_tender;
  const dispatchSession = useOutletContext().dispatchSession;
  const failureScenario =
    useOutletContext().session.scenarios.totalTenderFailure;
  const setSessionTenders = (newTendersObj) => {
    dispatchSession({ type: "UPDATE_TENDERS", payload: newTendersObj });
  };

  // make a priority-sorted arr from tenders in Returns state
  const tendersArr = tenderSort(ctxTenders);

  // activeTender info
  const activeTenderKey = tendersArr[finalizerState.activeIndex];
  const activeTenderValue = ctxTenders[activeTenderKey];

  // -- SHARED FUNCTIONS ----

  // Dispatch status change for current Tender
  const setStatusOfActiveTender = (newStatus) => {
    console.log(
      `Changing ${activeTenderValue.displayPaid} status from ${activeTenderValue.status} to ${newStatus}`
    );
    // Change the status
    const newTenderValue = {
      ...activeTenderValue,
      status: newStatus,
    };
    const outTendersObj = {
      ...ctxTenders,
      [activeTenderKey]: newTenderValue,
    };
    setSessionTenders(outTendersObj);
  };

  // Increment Counter
  const incrementActiveIndex = () => {
    const newCounter = finalizerState.activeIndex + 1;

    console.log(`counter from ${finalizerState.activeIndex} to ${newCounter}`);
    // to do: IF all queue tenders handled, navigate to next page.  This could also potientially live outside this functoin, but before the UseEffect()
    setFinalizerState({ ...finalizerState, activeIndex: newCounter });
  };

  useEffect(() => {
    if (activeTenderValue.status === tStatus.notStarted) {
      if (activeTenderValue.userOption) {
        setStatusOfActiveTender(tStatus.inProgress);
      } else if (failureScenario && activeTenderValue.canFail) {
        // set to Failure
        setStatusOfActiveTender(tStatus.failure);
      } else {
        setStatusOfActiveTender(tStatus.complete);
        incrementActiveIndex();
      }
    }
  });

  const paths70 = {

  }

  // Make array of the <TenderTypesLI>s  from the sorted tendersArr
  const tendersLIarr = tendersArr.map((thisTenderKey) => {
    //TO DO: fix key once this is working.
    return (
      <TenderTypesLI
        key={JSON.stringify(thisTenderKey)}
        tenderObj={ctxTenders[thisTenderKey]}
      />
    );
  });

  return (
    <section className={classes.container}>
      <section className={`thirty_panel }`}>
        <TitleBar>Tender Types</TitleBar>
        <section className={`${classes.mainContent} ${classes.content30}`}>
          {tendersLIarr}
        </section>
        <FooterContainer></FooterContainer>
      </section>
      <Payout70 activeTenderObj={activeTenderValue} />
    </section>
  );
};

export default FinalizeRefund;
