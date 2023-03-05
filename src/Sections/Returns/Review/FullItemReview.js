import classes from "./FullItemReview.module.css";

import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import InPageTitleBox from "../../../components/UI/DisplayOutputs/InPageTitleBox";
import FullReviewLI from "./FullReviewLI";

import { Link, useNavigate, useOutletContext } from "react-router-dom";

const FullReview = ({ pageStatus = "preSearch" }) => {
  const navigate = useNavigate();
  const returnsContext = useOutletContext();
  const unmatched = Object.values(returnsContext.session.unmatched);
  const totalPrice = 0;

  const statusObj = {
    preSearch: {
      preSearch: true,
      pageTitleBox: "These item(s) are missing invoices.",
      subtitle: "",
      canOverride: null,
      to: "../receipt-lookup",
      secondBtn: null,
    },
    postSearch: {
      preSearch: false,
      pageTitleBox: "These item(s) are not refundable.",
      subtitle: "Give items back to customer",
      canOverride: null,
      to: "../decline-slip",
      secondBtn: null,
    },
  };

  const umTableContents = unmatched.map((entry) => {
    return (
      <FullReviewLI
        key={entry.itemNum}
        itemDataObj={entry}
        liPreSearch={statusObj[pageStatus].preSearch}
      />
    );
  });

  return (
    <main className={classes.container}>
      <TitleBar lefticon={"back"} left_onClick={() => navigate(-1)}>
        Review
      </TitleBar>
      <section className={classes.mainContent}>
        <InPageTitleBox
          mainTitle={statusObj[pageStatus].pageTitleBox}
          subTitle={statusObj[pageStatus].subtitle}
        />
        <section className={classes.listContainer}>{umTableContents}</section>
      </section>
      <FooterContainer>
        <Link
          to={statusObj[pageStatus].to}
          className={`baseButton primary large contained100`}
        >
          Continue
        </Link>
        {statusObj[pageStatus].secondBtn}
      </FooterContainer>
    </main>
  );
};

export default FullReview;
