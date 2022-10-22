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
      <VerticalNavButton
        label="Receipt Entry"
        mainIcon={<ReceiptLineIcon className={classes.mainicon} />}
      />
      <VerticalNavButton
        label="Item Entry"
        mainIcon={<AddCartLineIcon className={classes.mainicon} />}
      />
      <VerticalNavButton
        label="Lookup"
        mainIcon={<LookupLineIcon className={classes.mainicon} />}
      />
      <VerticalNavButton
        label="No Sale"
        to="nosale"
        mainIcon={<SlashCashLineIcon className={classes.mainicon} />}
      />
      <VerticalNavButton
        label="Cancel Return"
        mainIcon={<CloseLineIcon className={classes.mainicon} />}
      />
      <VerticalNavButton
        label="Exchange"
        mainIcon={<ExchangeLineIcon className={classes.mainicon} />}
      />
      <VerticalNavButton
        label="Empty Cart"
        mainIcon={<SlashCartLineIcon className={classes.mainicon} />}
      />
    </section>
  );
};

export default VerticalNavMenu;
