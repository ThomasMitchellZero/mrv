import classes from "./Main.module.css";

import { NavLink, Outlet } from "react-router-dom";

import pagoda from "../../../assets/lowes-logo.svg"

const Main = () => {
  const linkStyle = ({ isActive }) =>
    isActive ? `${classes.navlink} ${classes.active}` : classes.navlink;

  return (
    <main className={classes.container}>
      <nav className={classes.globalnav}>
        <img className={classes.icon} src={pagoda} alt="Lowes Pagoda" />

        <NavLink to="home" className={linkStyle}>
          Homepage
        </NavLink>
        <NavLink to="returns" className={linkStyle}>
          Returns
        </NavLink>
        <NavLink to="exchanges" className={linkStyle}>
          Exchanges
        </NavLink>
        <NavLink to="store-exchanges" className={linkStyle}>
          Store Exchanges
        </NavLink>
        <NavLink to="xdt-exchanges" className={linkStyle}>
          XDT Exchanges
        </NavLink>
        <NavLink to="test" className={linkStyle}>
          Tests
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
