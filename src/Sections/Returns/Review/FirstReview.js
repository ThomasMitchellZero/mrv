import classes from "./FirstReview.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import InPageTitleBox from "../../../components/UI/InPageTitleBox";
import FullReviewLI from "../../../components/UI/FullReviewLI";
import MessageRibbon from "../../../components/UI/messageRibbon";

import { Link, useNavigate, useOutletContext } from "react-router-dom";

const FirstReview = () => {
  const navigate = useNavigate();
  const returnsContext = useOutletContext();
  const unmatched = Object.values(returnsContext.session.unmatched);

  const umTableContents = unmatched.map((entry) => {
    return (
      <FullReviewLI
        key={entry.itemNum}
        itemDataObj={entry}
        liPreSearch={true}
      />
    );
  });

  return (
    <main className={classes.container}>
      <TitleBar lefticon={"back"} left_onClick={() => navigate("..")}>
        Review
      </TitleBar>
      <section className={classes.mainContent}>
        <InPageTitleBox mainTitle="These item(s) are missing invoices." topContent={<MessageRibbon 
          text="Test Run"
          width="14rem"
        />}/>
        <section className={classes.listContainer}>{umTableContents}</section>
      </section>
      <FooterContainer>
        <Link
          to="../receipt-lookup"
          className={`baseButton primary large ${classes.button}`}
        >
          Continue
        </Link>
      </FooterContainer>
    </main>
  );
};

export default FirstReview;
