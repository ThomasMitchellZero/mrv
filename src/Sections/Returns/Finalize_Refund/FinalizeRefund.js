import classes from "./FinalizeRefund.module.css";

import tenderSort from "../functions/tenderSort";
import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "../functions/tenderStatusCodes";

import TenderBadges from "./TenderBadges";
import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TenderTypesLI from "./TenderTypesLI";
import InPageTitleBox from "../../../components/UI/DisplayOutputs/InPageTitleBox";
import MessageRibbon from "../../../components/UI/DisplayOutputs/MessageRibbon";

import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const FinalizeRefund = () => {
  // local state for FinalizeRefund
  const initialState = { currentIndex: 0 };
  const [finalizerState, setFinalizerState] = useState(initialState);

  // Refunds state

  const ctxTenders = useOutletContext().session.refunds_by_tender;
  const dispatchSession = useOutletContext().dispatchSession;
  const failure = useOutletContext().session.scenarios.totalTenderFailure;
  const updateTenders = (newTendersObj) => {
    dispatchSession({ type: "UPDATE_TENDERS", payload: newTendersObj });
  };

  // make a priority-sorted arr from tenders in Returns state
  const tendersArr = tenderSort(ctxTenders);

  // activeTender info
  const activeTender = ctxTenders[tendersArr[finalizerState.currentIndex]];
  const paid = Number(activeTender.paid / 100).toFixed(2);

  console.log(activeTender);

  const seventy_panel = {
    confirmCash: (
      <section className={`seventy_panel `}>
        <TitleBar>Refund Details</TitleBar>
        <section className={`${classes.mainContent} ${classes.content70}`}>
          <section className={` ${classes.content70}`}>
            <InPageTitleBox
              hasDivider={false}
              mainTitle={`Are you sure you want to refund $${paid} in cash?`}
              subTitle="All cash refunds will be given at the end of this return"
            />
            <section className={` ${classes.inPageBtnBox}`}>
              <button
                type="button"
                className={`baseButton secondary large contained30`}
              >
                No
              </button>
              <button
                type="button"
                className={`baseButton primary large contained30`}
              >
                Yes
              </button>
            </section>
          </section>
        </section>
        <FooterContainer></FooterContainer>
      </section>
    ),
    userInput: (
      <section className={`seventy_panel `}>
        <TitleBar>Refund Details</TitleBar>
        <section className={`${classes.mainContent} ${classes.content70}`}>
          <section className={` ${classes.content70}`}>
            <TenderBadges tender1={tType.check} tender2={tType.cash}/>
            <InPageTitleBox
              topContent={""}
              hasDivider={false}
              mainTitle={`Main`}
              subTitle={`Sub`}
            />
          </section>
        </section>
        <FooterContainer></FooterContainer>
      </section>
    ),
  };

  // Make array of the <TenderTypesLI>s  from the sorted tendersArr
  const tendersLIarr = tendersArr.map((thisTenderKey) => {
    //TO DO: fix key once this is working.
    return (
      <TenderTypesLI
        key={JSON.stringify(thisTenderKey)}
        dataObj={ctxTenders[thisTenderKey]}
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
      {seventy_panel.userInput}
    </section>
  );
};

export default FinalizeRefund;
