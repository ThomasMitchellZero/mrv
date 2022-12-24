import classes from "./FirstReview.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import InPageTitleBox from "../../../components/UI/InPageTitleBox";

import { useNavigate, useOutletContext } from "react-router-dom";

const FirstReview = () => {
  const returnsContext = useOutletContext();
  const navigate = useNavigate();

  return (
    <main className={classes.container}>
      <TitleBar
        lefticon={"back"}
        left_onClick={() => navigate("..")}
      ></TitleBar>
      <section className={classes.mainContent}>
        <section className={classes.centerColumn}>
            <InPageTitleBox></InPageTitleBox>
            <p>still herr</p>
        </section>
      </section>
      <FooterContainer></FooterContainer>
    </main>
  );
};

export default FirstReview;
