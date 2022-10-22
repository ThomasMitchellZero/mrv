import classes from "./ExchangeActions30.module.css"

import TitleBar from "../../../components/UI/TitleBar";
import VerticalNavButton from "../../../components/UI/VerticalNavButton";
import FooterContainer from "../../../components/UI/FooterContainer";
import VerticalNavMenu from "../../../components/UI/VerticalNavMenu";
import {
  TruckLineIcon,
  ExchangeLineIcon,
} from "../../../assets/lowes-icons/Line-Icons/LineIcons";

const ExchangeActions30 = (props) => {
  return (
    <section className={`thirty_panel ${classes.container}`}>
      <TitleBar lefticon="back">Delivery Return / Exchange</TitleBar>
      <VerticalNavMenu>
        <VerticalNavButton
          mainIcon={<TruckLineIcon className={classes.mainicon} />}
          label={"Schedule Return Pickup Only"}
        />
        <VerticalNavButton
          mainIcon={<ExchangeLineIcon className={classes.mainicon} />}
          label={"Schedule Exchange"}
        />
      </VerticalNavMenu>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default ExchangeActions30;
