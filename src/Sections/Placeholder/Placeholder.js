import classes from "./Placeholder.module.css";
import TitleBar from "../../components/UI/TitleBar";
import FooterContainer from "../../components/UI/FooterContainer";

const Placeholder = (props) => {
  return (
    <section>
      <TitleBar>{props.children}</TitleBar>
      <div className={classes.content}>Coming Soon</div>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default Placeholder;
