import classes from "./FinalizeRefund.module.css";

import tenderSort from "../functions/tenderSort";

import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TenderTypesLI from "./TenderTypesLI";

import { useOutletContext } from "react-router-dom";

const FinalizeRefund = () => {
  const ctxTenders = useOutletContext().session.refunds_by_tender;

  // not tested.
  const dispatchSession = useOutletContext().dispatchSession;
  const updateTenders = (newTendersObj) => {
    dispatchSession({ type: "UPDATE_TENDERS", payload: newTendersObj });
  };

  // make a priority-sorted arr from tenders in Returns state
  const tendersArr = tenderSort(ctxTenders);
  console.log(tendersArr);

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
      <section className={`seventy_panel `}>
        <TitleBar>Refund Details</TitleBar>
        <section
          className={`${classes.mainContent} ${classes.content70}`}
        ></section>
        <FooterContainer></FooterContainer>
      </section>
    </section>
  );
};

export default FinalizeRefund;
