import classes from "./FirstReview.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import { useNavigate } from "react-router-dom";

const FirstReview = () => {
  const navigate = useNavigate();

  return (
    <main className={classes.container}>
      <TitleBar
        lefticon={"back"}
        left_onClick={() => navigate("..")}
      ></TitleBar>
      <section className={classes.mainContent}>
        <p>we make it here</p>
      </section>
      <FooterContainer></FooterContainer>
    </main>
  );
};

export default FirstReview;
