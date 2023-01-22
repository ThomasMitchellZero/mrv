import classes from "./FinalizeRefund.module.css";

import dummyTenders from "./dummyTenders";

import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TenderTypesLI from "./TenderTypesLI";

const FinalizeRefund = () => {
  // try and keep this a single point of reference so I don't have to change 10 billion variables when it comes time to populate this from the Returns state.
  const tendersArr = Object.values(dummyTenders);
  console.log(tendersArr);

  const tendersLIarr = tendersArr.map((thisTenderObj) => {

    //TO DO: fix key once this is working.
    return <TenderTypesLI key={JSON.stringify(thisTenderObj)} dataObj={thisTenderObj} />;
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
