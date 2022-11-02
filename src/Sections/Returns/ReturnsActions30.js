import classes from "./ReturnsActions30.module.css";

import TitleBar from "../../components/UI/TitleBar";
import VerticalNavMenu from "../../components/UI/VerticalNavMenu";
import VerticalNavButton from "../../components/UI/VerticalNavButton";
import FooterContainer from "../../components/UI/FooterContainer";

import { useNavigate } from "react-router-dom";

import {
  ReceiptLineIcon,
  AddCartLineIcon,
  LookupLineIcon,
  SlashCashLineIcon,
  CloseLineIcon,
  ExchangeLineIcon,
  SlashCartLineIcon,
} from "../../assets/lowes-icons/Line-Icons/LineIcons";

const ReturnsActions30 = (props) => {

  const navigate = useNavigate()

  return (
    <section className={`${classes.container}`}>
      <TitleBar>Actions</TitleBar>
      <VerticalNavMenu>
        <VerticalNavButton
          onClick={()=> navigate("..")}
          label="Receipt Entry"
          mainIcon={<ReceiptLineIcon className={classes.mainicon} />}
        />
        <VerticalNavButton
          label="Item Entry"
          to="item_entry"
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
          to="exchange"
          mainIcon={<ExchangeLineIcon className={classes.mainicon} />}
        />
        <VerticalNavButton
          label="Empty Cart"
          mainIcon={<SlashCartLineIcon className={classes.mainicon} />}
        />
      </VerticalNavMenu>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default ReturnsActions30;

/* 


*/
