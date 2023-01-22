import classes from "./FinalizeRefund.module.css";

import dummyTenders from "./dummyTenders";

import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";

console.log(dummyTenders)

const FinalizeRefund = () => {
  return (
    <section className={classes.container}>
      <section className={`thirty_panel }`}>
        <TitleBar>Tender Types</TitleBar>
        <section
          className={`${classes.mainContent} ${classes.content70}`}
        ></section>
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
