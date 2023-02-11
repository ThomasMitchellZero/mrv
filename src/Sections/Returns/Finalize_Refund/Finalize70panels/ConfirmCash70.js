import classes from "./ConfirmCash70.module.css";

import TitleBar from "../../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../../components/UI/PageLayout/FooterContainer";
import TenderBadges from "../TenderBadges";
import InPageTitle from "../../../../components/UI/DisplayOutputs/InPageTitleBox";

import tType from "../../../../components/global_functions/tenderTypes";

const ConfirmCash70 = ({activeTenderObj}) => {
  return (
    <section className={`seventy_panel `}>
      <TitleBar>Refund Details</TitleBar>
      <section className={`${classes.mainContent} ${classes.content70}`}>
        <InPageTitle
          hasDivider={false}
          mainTitle={`Are you sure you want to refund $${activeTenderObj.displayPaid} in cash?`}
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
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default ConfirmCash70;
