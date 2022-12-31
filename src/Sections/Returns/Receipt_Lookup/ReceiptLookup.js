import classes from "./ReceiptLookup.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import MiniItemLI from "../../../components/UI/MiniItemLI";
import MessageRibbon from "../../../components/UI/MessageRibbon";
import InPageTitleBox from "../../../components/UI/InPageTitleBox";
import RLsearchFielder from "./RLsearchFielder";
import RL1LineField from "./RL1LineField";

import { MdOutlineCorporateFare, MdCreditCard, MdPhone } from "react-icons/md";
import { TbFileInvoice, TbPackage, TbHammer } from "react-icons/tb";

import { useReducer } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

const defaultState = {
  activeType: "creditCard",
  didSearch: false,
};

const lookupReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE": {
      return {
        ...state,
        activeType: action.payload,
      };
    }

    case "MINIMUM_EFFORT": {
      return { ...state, didSearch: true };
    }

    default:
      return state;
  }
};

const ReceiptLookup = () => {
  const navigate = useNavigate();

  const dispatchSession = useOutletContext.dispatchSession;

  const [recLookupState, dispatchLookup] = useReducer(
    lookupReducer,
    defaultState
  );

  //// UNMATCHED ITEMS 30 PANEL //////////
  const unmatchedArr = Object.values(useOutletContext().session.unmatched);

  // make an array of ItemLIs from the session.unmatched state.
  const unmatchedLIarr = unmatchedArr.map((iObj) => {
    return (
      <MiniItemLI
        key={iObj.itemNum}
        itemObj={iObj}
        hasMessage={
          //populate the MessageRibbon.
          <MessageRibbon
            text="Missing Invoice"
            size="small"
            width="auto"
            color="gold"
          />
        }
      />
    );
  });

  //// SEARCH 70 PANEL ////////////

  // component for Search Buttons
  const optionBtn = (searchType, text, icon) => {
    // check if button type matches current activeType for CSS.
    const isActive = recLookupState.activeType === searchType ? "active" : "";
    return (
      <button
        className={`baseButton secondary large ${isActive}`}
        onClick={() => {
          dispatchLookup({ type: "SET_ACTIVE", payload: searchType });
        }}
      >
        {icon}
        {text}
      </button>
    );
  };

  const outObj = {
    creditCard: (
      <RL1LineField
        validLength={16}
        invoMatchStr="creditCard"
        invalidMsg="Enter valid credit card number"
        fieldLabel="Enter credit card number or swipe to search"
        fieldPlaceholder="Credit card #"
        didMinimum={dispatchLookup({type: "MINIMUM_EFFORT"})}
      />
    ),
  };

  //// FULL RENDERED COMPONENT ////

  return (
    <section className={classes.container}>
      <section className="thirty_panel">
        <TitleBar>Items Missing Invoices</TitleBar>
        <section className={classes.thirtyContent}>{unmatchedLIarr}</section>
        <FooterContainer></FooterContainer>
      </section>
      <section className="seventy_panel">
        <TitleBar
          lefticon={"back"}
          left_onClick={() => {
            navigate("..");
          }}
        >
          Receipt Lookup
        </TitleBar>
        <section className={classes.seventyContent}>
          <InPageTitleBox mainTitle="Select an option to search for receipt." />
          <h2 className="inPageTitle">
            Select an option to search for receipt.
          </h2>
          <section className={classes.optionBtnHolder}>
            {optionBtn(
              "creditCard",
              "Credit Card",
              <MdCreditCard className={`${classes.icon}`} />
            )}
            {optionBtn(
              "phone",
              "Customer Phone #",
              <MdPhone className={`${classes.icon}`} />
            )}
            {optionBtn(
              "order",
              "Order #",
              <TbPackage className={`${classes.icon}`} />
            )}
            {optionBtn(
              "commercialAcct",
              "Lowe's Commercial Account",
              <MdOutlineCorporateFare className={`${classes.icon}`} />
            )}
            {optionBtn(
              "proID",
              "Pro ID #",
              <TbHammer className={`${classes.icon}`} />
            )}
          </section>
          {outObj[recLookupState.activeType] ?? <div>still working on it</div>}
        </section>

        <FooterContainer></FooterContainer>
      </section>
    </section>
  );
};

export default ReceiptLookup;

/*


 */
