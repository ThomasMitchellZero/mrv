import classes from "./VerticalNavMenu.module.css";

import VerticalNavButton from "./VerticalNavButton";
import { ExchangeLineIcon } from "../../assets/lowes-icons/Line-Icons/LineIcons";

const VerticalNavMenu = (props) => {
  return (
    <section className={classes.verticalnavmenu}>
      <p>Placeholder</p>
      <VerticalNavButton label="test"></VerticalNavButton>
    </section>
  );
};

export default VerticalNavMenu;
