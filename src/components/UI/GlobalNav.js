import classes from "./GlobalNav.module.css";
import pagoda from "../../assets/lowes-logo.svg";
import { NavLink } from "react-router-dom";

const GlobalNav = () => {
  const linkStyle = ({ isActive }) =>
    isActive ? `${classes.navlink} ${classes.active}` : classes.navlink;

  return (
    <nav className={classes.globalnav}>
      <img className={classes.icon} src={pagoda} alt="Lowes Pagoda" />

      <NavLink to="home" className={linkStyle}>
        Homepage
      </NavLink>
      <NavLink to="orders" className={linkStyle}>
        Orders
      </NavLink>
      <NavLink to="showroom" className={linkStyle}>
        Showroom
      </NavLink>
      <NavLink to="returns" className={linkStyle}>
        Returns
      </NavLink>
    </nav>
  );
};

export default GlobalNav;