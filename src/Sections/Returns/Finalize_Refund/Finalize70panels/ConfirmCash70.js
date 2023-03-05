import classes from "./ConfirmCash70.module.css";

import TitleBar from "../../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../../components/UI/PageLayout/FooterContainer";
import TenderBadges from "../TenderBadges";
import InPageTitle from "../../../../components/UI/DisplayOutputs/InPageTitleBox";

import tStatus from "../../functions/tenderStatusCodes";
import tType from "../../../../components/global_functions/tenderTypes";


const ConfirmCash70 = ({tenderObj, cashYes, cashNo}) => {


  return (
    <section className={`seventy_panel `}>
      <TitleBar>Refund Details</TitleBar>
      <section className={`${classes.mainContent} ${classes.content70}`}>
        <InPageTitle
          hasDivider={false}
          mainTitle={`Are you sure you want to refund $${tenderObj.displayPaid} in cash?`}
          subTitle="All cash refunds will be given at the end of this return"
        />
        <section className={` ${classes.inPageBtnBox}`}>
          <button
            type="button"
            className={`baseButton secondary large contained30`}
            onClick={()=> cashNo(tStatus.inProgress)}
          >
            No
          </button>
          <button
            type="button"
            className={`baseButton primary large contained30`}
            onClick={()=> cashYes(tType.cash)}
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
