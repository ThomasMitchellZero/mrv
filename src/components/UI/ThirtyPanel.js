import classes from "./ThirtyPanel.module.css";
import FooterContainer from "./FooterContainer";
import TitleBar from "./TitleBar";

const ThirtyPanel = (props) => {
  return (
    <div className={classes.thirty_panel}>
      <TitleBar>Test</TitleBar>
      <div className={classes.main_content}></div>
      <FooterContainer></FooterContainer>
    </div>
  );
};

export default ThirtyPanel;
