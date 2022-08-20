import classes from "./Header.module.css";
import pagoda from "../assets/lowes-logo.svg";

const Header = () => {
  return (
    <div className={classes.header}>
      <img className={classes.icon} src={pagoda} alt="Lowes Pagoda" />
    </div>
  );
};

export default Header;
