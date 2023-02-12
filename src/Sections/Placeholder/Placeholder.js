import classes from "./Placeholder.module.css";
import TitleBar from "../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../components/UI/PageLayout/FooterContainer";

const Placeholder = ({
  titleText = "Placeholder",
  extraClasses,
  pageText = "Coming Soon",
}) => {
  return (
    <section className={classes.container}>
      <TitleBar>{titleText}</TitleBar>
      <div className={classes.content}>{pageText}</div>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default Placeholder;
