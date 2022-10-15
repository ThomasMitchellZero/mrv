import { NavLink } from "react-router-dom";
import classes from "./NavTab.module.css";


const NavTab = (props) => {
  return (
    <NavLink
      id={props.id}
      onClick={props.onClick}
      className={`${classes.navtab} ${props.active ? classes.active : ""}`}
    >
      {props.id}
    </NavLink>
  );
};

export default NavTab;
