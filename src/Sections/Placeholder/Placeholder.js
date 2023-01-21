import classes from "./Placeholder.module.css";
import TitleBar from "../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../components/UI/PageLayout/FooterContainer";

const Placeholder = (props) => {
  return (
    <section className={classes.container}>
      <TitleBar>{props.children}</TitleBar>
      <div className={classes.content}>Coming Soon</div>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default Placeholder;
