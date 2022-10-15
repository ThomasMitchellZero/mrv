import classes from "./Placeholder.module.css";
import TitleBar from "../../components/UI/TitleBar";

const Placeholder = (props) => {
  return (
    <section>
      <TitleBar>{props.children}</TitleBar>
      <div className={classes.content}>Coming Soon</div>
    </section>
  );
};

export default Placeholder;
