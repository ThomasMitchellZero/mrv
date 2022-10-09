import classes from "./BasePanel.module.css"
import FooterContainer from "./FooterContainer";
import TitleBar from "./TitleBar";

const ThirtyPanel = (props) => {
  return (
    <div className={classes.thirty_panel}>
      <TitleBar>Title</TitleBar>
      <div className={classes.main_content}>
        {props.children}
      </div>
      <FooterContainer></FooterContainer>
    </div>
  );
};

export default ThirtyPanel;
