import classes from "./FooterContainer.module.css";
const FooterContainer = ({ className = "", children }) => {
  // stying can be passed from parent when we need to override
  return (
    <footer className={`${classes.container} ${className}`}>{children}</footer>
  );
};


export default FooterContainer;
