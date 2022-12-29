import classes from "./TotalReview.module.css";

import TitleBar from "../../../components/UI/TitleBar";

import { useNavigate, useOutletContext } from "react-router-dom";

const TotalReview = () => {
  const returnsContext = useOutletContext();
  const navigate = useNavigate();
  return (
    <section className={classes.container}>
      <TitleBar
        lefticon={"back"}
        left_onClick={() => {
          navigate(-1);
        }}
      >
        Total Review
      </TitleBar>
      <h2>Total Review Placeholder</h2>
    </section>
  );
};

export default TotalReview;