import classes from "./TotalReview.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import InPageTitleBox from "../../../components/UI/InPageTitleBox";

import { useNavigate, useOutletContext } from "react-router-dom";

const TotalReview = () => {
  const returnsContext = useOutletContext();
  const navigate = useNavigate();
  return (
    <section className={classes.container}>
      <section className={`thirty_panel`}>
        <TitleBar>Returned Items</TitleBar>
        <section className={`${classes.mainContent}`}></section>
        <FooterContainer></FooterContainer>
      </section>

      <section className={`seventy_panel`}>
        <TitleBar
          lefticon={"back"}
          left_onClick={() => {
            navigate(-1);
          }}
        >
          Total Review
        </TitleBar>
        <section className={`${classes.mainContent} ${classes.seventyContent}`}>
          <InPageTitleBox mainTitle="$XX.XX will refund to the tender(s) below" />
        </section>
        <FooterContainer></FooterContainer>
      </section>
    </section>
  );
};

export default TotalReview;
