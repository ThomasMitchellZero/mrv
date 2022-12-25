import classes from "./FirstReview.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import InPageTitleBox from "../../../components/UI/InPageTitleBox";
import FullReviewLI from "../../../components/UI/FullReviewLI";

import { useNavigate, useOutletContext } from "react-router-dom";

const FirstReview = () => {
  const navigate = useNavigate();
  const returnsContext = useOutletContext();
  const unmatched = Object.values(returnsContext.session.unmatched);

  const umTableContents = unmatched.map((entry) => {
    return <FullReviewLI key={entry.itemNum}itemDataObj={entry} />;
  });

  return (
    <main className={classes.container}>
      <TitleBar
        lefticon={"back"}
        left_onClick={() => navigate("..")}
      ></TitleBar>
      <section className={classes.mainContent}>
        <section className={classes.centerColumn}>
          <InPageTitleBox mainTitle="These item(s) are missing invoices." />
          <section className={classes.listContainer}>
            {umTableContents}
          </section>
        </section>
      </section>
      <FooterContainer></FooterContainer>
    </main>
  );
};

export default FirstReview;
