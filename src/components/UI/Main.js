import classes from "./Main.module.css";

import { NavLink, Outlet } from "react-router-dom";

import pagoda from "../../assets/lowes-logo.svg"

const Main = (props) => {
  const linkStyle = ({ isActive }) =>
    isActive ? `${classes.navlink} ${classes.active}` : classes.navlink;

  return (
    <main className={classes.container}>
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
      <Outlet />
    </main>
  );
};

export default Main

/*

<Route exact path="/">
    <Redirect to="/home" />
</Route>

*/
