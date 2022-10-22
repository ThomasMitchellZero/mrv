import classes from "./VerticalNavMenu.module.css";

import VerticalNavButton from "./VerticalNavButton";

import {
  ReceiptLineIcon,
  AddCartLineIcon,
  LookupLineIcon,
  SlashCashLineIcon,
  CloseLineIcon,
  ExchangeLineIcon,
  SlashCartLineIcon,
} from "../../assets/lowes-icons/Line-Icons/LineIcons";

/*

      <NavLink to="home" className={linkStyle}>
        Homepage
      </NavLink>

*/

const VerticalNavMenu = (props) => {
  return (
    <section className={classes.verticalnavmenu}>
      {props.children}
    </section>
  );
};

export default VerticalNavMenu;
