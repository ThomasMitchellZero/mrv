import classes from "./FooterContainer.module.css";
const FooterContainer = (props) => {
  
  // stying can be passed from parent when we need to override
  return (
    <div className={`${classes.footer_container} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default FooterContainer;
