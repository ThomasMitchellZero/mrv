import classes from "./BasePanel.module.css";
import FooterContainer from "./FooterContainer";
import TitleBar from "./TitleBar";
import Button from "./Button";

//This should end up being deleted.  I'm only keeping this for now in case I screw something up and need to re-learn how I did it.

const BasePanel = (props) => {
  // this is a test and footerConents won't stay here. In reality this would be defined in the parent configuration and passed as a prop.
  const footerContents = (
    <div className={classes.footerContents}>
      <Button buttonType="primary">Button 1</Button>
      <Button buttonType="secondary">Button Two</Button>
    </div>
  );
  return (
    <div className={classes.base_panel}>
      <TitleBar>Title</TitleBar>
      <div className={classes.main_content}>{props.children}</div>
      <FooterContainer>
        {footerContents}
      </FooterContainer>
    </div>
  );
};

export default BasePanel;
