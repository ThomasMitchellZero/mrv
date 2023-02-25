import classes from "./FinalizeRefund.module.css";

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

import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

const FinalizeRefund = () => {
  const navigate = useNavigate();

  // Returns Session
  const sessionCtx = useOutletContext().session;
  const dispatchSession = useOutletContext().dispatchSession;

  const ctxTendersPack = sessionCtx.refunds_by_tender;
  const failureScenario = sessionCtx.scenarios.totalTenderFailure;

  const dispatchTenderArr = (outTendersArr) => {
    console.log(` dispatched from Firnalize Refund `);
    console.log(outTendersArr);
    dispatchSession({
      type: "UPDATE_TENDERS",
      payload: { newtendersArr: outTendersArr },
    });
  };

  // Specifics from Returns Session state
  const tendersArr = ctxTendersPack.tendersArr;
  const activeIndex = ctxTendersPack.activeIndex;

  //NOT SURE this will work?
  if (activeIndex > tendersArr.length) {
    // if true, all tenders have been processed so proceed to receipt stage.
    navigate("../receipt");
  }

  const activeTenderObj = tendersArr[activeIndex];
  const activeStatus = activeTenderObj.status;
  const activeType = activeTenderObj.tenderType;

  // ---- SHARED FUNCTIONS ----

  const buttoner = (style, text, whenClicked) => {
    const sizes = {
      primary: "contained70",
      secondary: "containedBtn2",
    };
    return (
      <button
        onClick={whenClicked}
        className={`baseButton large ${style} ${sizes[style]}`}
      >
        {text}
      </button>
    );
  };

// ---- STATE-CHANGING FUNCTIONS ----

  const changeStatusOfActive = (futureStatus )=>{
    let outTendersArr = cloneDeep(tendersArr);
    outTendersArr[activeIndex].status = futureStatus;

    dispatchTenderArr(outTendersArr)
  }

  // 
  const tTypeSwapper = (swapTo) => {
    // even in a Swap, tType never actually changes.
    const swappedLabels = {
      [tType.cash]: "Cash",
      [tType.storeCredit]: "Store Credit",
    };

    let outTendersArr = cloneDeep(tendersArr);

    // Change the active tender's info to Swapped.
    outTendersArr[activeIndex] = {
      ...outTendersArr[activeIndex],
      status: tStatus.swapped,
      swapLabel: swappedLabels[swapTo],
    };

    const activePaid = activeTenderObj.paid;

    let indexSwappingTo = outTendersArr.findIndex((tender) => {
      return tender.tenderType === tType[swapTo];
    });

    // If this type doesn't already exist...
    if (indexSwappingTo === -1) {
      // add it to start of array
      outTendersArr.unshift({
        tenderType: tType[swapTo],
        paid: 0,
      });
      indexSwappingTo = 0;
    }

    outTendersArr[indexSwappingTo].paid += activePaid;
    console.log("swapped Payload is:");
    console.log(outTendersArr);

    dispatchTenderArr(outTendersArr);
  };

  // Not sure if needed
  const emptyUI = (
    <Placeholder
      titleText="Blank"
      extraClasses={`seventy_panel `}
      pageText="You shouldn't be here"
    />
  );



  const paths70 = {
    [tStatus.failure]: (
      <UserInput70
        activeTenderObj={activeTenderObj}
        badge2={tType.storeCredit}
        topInPageContent={
          <MessageRibbon
            text={`${activeTenderObj.tenderLabel} declined. Refund as Store Credit.`}
            color="red"
            width="auto"
          />
        }
        mainButton={buttoner("primary", "Refund Store Credit", () =>
          tTypeSwapper(tType.storeCredit)
        )}
      />
    ),

    [tStatus.progress2Line]: <ConfirmCash70 />,

    [tStatus.inProgress]: {
      [tType.cash]: <Payout70 activeTenderObj={activeTenderObj} />,
      [tType.storeCredit]: <Payout70 activeTenderObj={activeTenderObj} />,
      [tType.debit]: <UserInput70 activeTenderObj={activeTenderObj} 
          mainButton={buttoner("primary", "Refund To Debit", () =>
          changeStatusOfActive(tStatus.complete))}
          altButton={buttoner("secondary", "Refund With Cash", () =>
          tTypeSwapper(tType.cash))}
      />,
      [tType.check]: <UserInput70 activeTenderObj={activeTenderObj}/>,
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

/*










*/
