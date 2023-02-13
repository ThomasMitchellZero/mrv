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
import Placeholder from "../../Placeholder/Placeholder";

import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

const FinalizeRefund = () => {
  console.log("DING");
  // Returns Session
  const sessionCtx = useOutletContext().session;
  const dispatchSession = useOutletContext().dispatchSession;

  const ctxTendersPack = cloneDeep(sessionCtx.refunds_by_tender);
  const failureScenario = sessionCtx.scenarios.totalTenderFailure;
  const dispatchTenderPack = (newTendersArr) => {
    dispatchSession({ type: "UPDATE_TENDERS", payload: {newtendersArr: newTendersArr}});
  };

  // Specifics from Returns Session state
  const tendersArr = ctxTendersPack.tendersArr;
  const activeIndex = ctxTendersPack.activeIndex;

  const activeTenderObj = tendersArr[activeIndex];
  const activeStatus = activeTenderObj.status;
  const activeType = activeTenderObj.tenderType;

  // ---- SHARED FUNCTIONS ----

  const toStoreCredit = ()=>{

    const outActiveTenderObj = {
      ...activeTenderObj, 
      status: tStatus.swapped, 
      swapLabel: "Store Credit"
    }

  }

  // Not sure if needed
  const emptyUI = (
    <Placeholder
      titleText="Blank"
      extraClasses={`seventy_panel `}
      pageText="You shouldn't be here"
    />
  );

  const paths70 = {
    [tStatus.failure]: <UserInput70 />,

    [tStatus.progress2Line]: <ConfirmCash70 />,

    [tStatus.inProgress]: {
      [tType.cash]: <Payout70 activeTenderObj={activeTenderObj} />,
      [tType.storeCredit]: <Payout70 activeTenderObj={activeTenderObj} />,
      [tType.debit]: <UserInput70 />,
      [tType.check]: <UserInput70 />,
    },
  };

  // Use active panel for active Status unless panel also depends on Type
  //TODO - this is a crappy description.
  const active70 =
    paths70?.[activeStatus]?.[activeType] ?? paths70?.[activeStatus] ?? emptyUI;

  // Make array of the <TenderTypesLI>s  from the sorted tendersArr
  const tendersLIarr = tendersArr.map((thisTenderObj) => {
    return (
      <TenderTypesLI key={thisTenderObj.primaryKey} tenderObj={thisTenderObj} />
    );
  });

  console.log("dong");

  return (
    <section className={classes.container}>
      <section className={`thirty_panel }`}>
        <TitleBar>Tender Types</TitleBar>
        <section className={`${classes.mainContent} ${classes.content30}`}>
          {tendersLIarr}
        </section>
        <FooterContainer></FooterContainer>
      </section>
      {active70}
    </section>
  );
};

export default FinalizeRefund;
