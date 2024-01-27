import classes from "./Actions30.module.css";

import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import VerticalNavButton from "../../../components/UI/VerticalNavButton";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import { useTest } from "../functions/useTest";
import { useOutletContext } from "react-router-dom";
import { useAddRtrnItem } from "../_CustomHooks/rtrnHooks";

import { useNavigate, Link } from "react-router-dom";

import { MdArrowForward, MdOutlineScience } from "react-icons/md";

import {
  ReceiptLineIcon,
  AddCartLineIcon,
  LookupLineIcon,
  SlashCashLineIcon,
  CloseLineIcon,
  ExchangeLineIcon,
  SlashCartLineIcon,
} from "../../../assets/lowes-icons/Line-Icons/LineIcons";

const Actions30 = ({ dispatchActive, returnState }) => {
  const returnsContext = useOutletContext(); // Can I just use Outlet Context for everything?
  const dispSession = returnsContext.dispatchSession;

  const navigate = useNavigate();
  const testFunc = useTest({ dispatcherFunction: dispSession });
  const addRtrnItem = useAddRtrnItem();

  // panel dispatcher from ReturnsIndex
  const dispatchActivePanels = dispatchActive;

  //vars from Return state
  const returnsCtx = returnState.session;
  const hasItems = Object.keys(returnsCtx.items).length ? true : false;
  const hasUnmatched = Object.keys(returnsCtx.unmatched).length ? true : false;

  return (
    <section className={`${classes.container}`}>
      <TitleBar>Actions</TitleBar>
      <section className={classes.buttonBox}>
        <VerticalNavButton
          onClick={() => {
            testFunc({ a: "Sorin" });
            dispatchActivePanels({
              type: "SET_PANELS",
              payload: { set30: "invoice_entry", set70: "session_invoices" },
            });
          }}
          label="Receipt Entry"
          mainIcon={<ReceiptLineIcon className={classes.mainicon} />}
        />
        <VerticalNavButton
          label="Item Entry"
          onClick={() =>
            dispatchActivePanels({
              type: "SET_PANELS",
              payload: {
                set30: "item_entry",
                set70: "session_items",
                activeItem: "400",
              },
            })
          }
          mainIcon={<AddCartLineIcon className={classes.mainicon} />}
        />
        <VerticalNavButton
          label="Lookup"
          mainIcon={<LookupLineIcon className={classes.mainicon} />}
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
          //multiple-reasons
          label="Multiple Reasons Test"
          onClick={() => {
            addRtrnItem({ itemNum: "400", itemQty: 12 });
            dispatchActivePanels({
              type: "SET_PANELS",
              payload: {
                set30: "multi_reason_100",
                set70: "session_items",
                activeItem: "400",
              },
            });
          }}
          mainIcon={
            <MdOutlineScience fontSize="1.5rem" className={classes.mainicon} />
          }
        />
      </section>
      <FooterContainer>
        {!hasItems ? null : (
          <Link
            className={`baseButton primary large contained30`}
            to={
              // if all items are matched, skip straight to total review
              hasUnmatched ? "first-review" : "total-review"
            }
          >
            Continue
          </Link>
        )}
      </FooterContainer>
    </section>
  );
};

export default Actions30;

/* 

relative="path"

*/
