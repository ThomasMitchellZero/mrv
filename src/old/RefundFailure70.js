import classes from "./UserInput70.module.css";

import TitleBar from "../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../components/UI/PageLayout/FooterContainer";
import TenderBadges from "../Sections/Returns/Finalize_Refund/TenderBadges";
import InPageTitle from "../components/UI/DisplayOutputs/InPageTitleBox";

import tType from "../components/global_functions/tenderTypes";

const UserInput70 = ({
  activeTenderObj,
  mainButton,
  altButton,
  badge2,
  subtitle,
  topInPageContent,
}) => {
  return (
    <section className={`seventy_panel `}>
      <TitleBar>Refund Details</TitleBar>
      <section className={`${classes.mainContent}`}>
        <TenderBadges tender1={activeTenderObj.tenderType} tender2={badge2} />
        <InPageTitle
          topContent={topInPageContent}
          hasDivider={false}
          mainTitle={`${activeTenderObj.displayPaid} due to customer`}
          subTitle={subtitle}
        />
      </section>
      <FooterContainer>
        {altButton}
        {mainButton}
      </FooterContainer>
    </section>
  );
};

export default UserInput70;
