import classes from "./FooterContainer.module.css";
const FooterContainer = (props) => {
  return <div className={`${classes.footer_container}`}>
    {props.children}
  </div>;
};

export default FooterContainer;