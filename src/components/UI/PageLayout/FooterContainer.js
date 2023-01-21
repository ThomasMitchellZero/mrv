import classes from "./FooterContainer.module.css";
const FooterContainer = (props) => {
  
  // stying can be passed from parent when we need to override
  return (
    <footer className={`${classes.container} ${props.className}`}>
      {props.children}
    </footer>
  );
};

export default FooterContainer;
