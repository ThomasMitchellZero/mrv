import classes from "./Actions30.module.css";

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

const Actions30 = (props) => {
  // panel dispatcher from ReturnsIndex
  const dispatchActivePanels = props.dispatchActivePanels;

  const navigate = useNavigate();

  return (
    <section className={`${classes.container}`}>
      <TitleBar>Actions</TitleBar>
      <VerticalNavMenu>
        <VerticalNavButton
          onClick={() =>
            dispatchActivePanels({
              type: "SET_PANELS",
              payload: { set30: "invoice_entry", set70: "session_invoices" },
            })
          }
          label="Receipt Entry"
          mainIcon={<ReceiptLineIcon className={classes.mainicon} />}
        />
        <VerticalNavButton
          label="Item Entry"
          onClick={() =>
            dispatchActivePanels({
              type: "SET_PANELS",
              payload: { set30: "item_entry", set70: "session_items" },
            })
          }
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
          onClick={() => navigate("..")}
          mainIcon={<SlashCartLineIcon className={classes.mainicon} />}
        />
      </VerticalNavMenu>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default Actions30;

/* 


*/
