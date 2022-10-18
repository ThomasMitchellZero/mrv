import classes from "./VerticalNavMenu.module.css";

import VerticalNavButton from "./VerticalNavButton";
import {
  ReceiptLineIcon,
  AddCartLineIcon,
  LookupLineIcon,
  SlashCashLineIcon,
  CloseLineIcon,
  ExchangeLineIcon,
} from "../../assets/lowes-icons/Line-Icons/LineIcons";

const VerticalNavMenu = (props) => {
  return (
    <section className={classes.verticalnavmenu}>
      <p>Placeholder</p>
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
    </section>
  );
};

export default VerticalNavMenu;
