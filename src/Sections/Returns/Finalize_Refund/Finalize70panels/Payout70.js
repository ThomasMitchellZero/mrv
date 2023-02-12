import classes from "./Payout70.module.css";

import TitleBar from "../../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../../components/UI/PageLayout/FooterContainer";
import TenderBadges from "../TenderBadges";
import InPageTitle from "../../../../components/UI/DisplayOutputs/InPageTitleBox";

import tType from "../../../../components/global_functions/tenderTypes";

const Payout70 = ({ activeTenderObj, onClick }) => {
  
  const typesObj = {
    [tType.cash]: {
      mainTitle: `$${activeTenderObj.displayPaid} due to customer.`,
      subTitle: "Close cash drawer to continue",
    },
    [tType.storeCredit]: {
      mainTitle: `$${activeTenderObj.displayPaid} will be refunded to customer.`,
      subTitle: "Swipe In-Store Credit card to continue.",
    },
  };

  const handeClick = () => {};

  //const activeType = activeTenderObj.tenderType;
  const activeType = tType.storeCredit;

  return (
    <section className={`seventy_panel `}>
      <TitleBar>Refund Details</TitleBar>
      <section className={`${classes.mainContent}`}>
        <TenderBadges tender1={activeType} />
        <InPageTitle
          topContent={null}
          hasDivider={false}
          mainTitle={`${typesObj[activeType].mainTitle}`}
          subTitle={`${typesObj[activeType].subTitle}`}
        />
      </section>
      <FooterContainer>
        <button
          onClick={handeClick}
          className={`baseButton large primary contained70`}
        >
          Done
        </button>
      </FooterContainer>
    </section>
  );
};

export default Payout70;