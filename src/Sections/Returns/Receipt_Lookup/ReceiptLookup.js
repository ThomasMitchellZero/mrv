import classes from "./ReceiptLookup.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import MiniItemLI from "../../../components/UI/MiniItemLI";
import MessageRibbon from "../../../components/UI/MessageRibbon";
import InPageTitleBox from "../../../components/UI/InPageTitleBox";
import RL1LineField from "./RL1LineField";

import InvoiceMatching from "./InvoiceMatching";

import { MdOutlineCorporateFare, MdCreditCard, MdPhone } from "react-icons/md";
import { TbFileInvoice, TbPackage, TbHammer } from "react-icons/tb";

import { useReducer } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

const defaultState = {
  activeType: "creditCard",
  didSearch: false,
  inputs: "",
  inputsValidity: false,
  warningVisible: false,
};

const lookupReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE": {
      return {
        ...defaultState,
        activeType: action.payload,
      };
    }
    case "MINIMUM_EFFORT": {
      return { ...state, didSearch: true };
    }

    case "CHANGE_INPUT": {
      return { ...state, ...action.payload };
    }
    case "SHOW_WARNING": {
      return { ...state, warningVisible: action.payload };
    }
    case "SUBMIT": {
      return {
        ...state,
        didSearch: true,
        inputs: "",
        inputsValidity: false,
        warningVisible: false,
      };
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const ReceiptLookup = () => {
  const navigate = useNavigate();

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
        type="button"
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

  // When the user presses the button...
  const handleSubmit = (event) => {
    event.preventDefault();
    // user can continue after 1 search.
    dispatchLookup({ type: "SUBMIT" });
    // each field searches via a different function.  Passes this function to primary InvoiceMatcher
    InvoiceMatching({
      searchType: recLookupState.activeType,
      userInput: recLookupState.inputs,
    });
  };

  const searchComponents = {
    creditCard: (
      <RL1LineField
        RLstate={recLookupState}
        RLreducer={dispatchLookup}
        validLength={16}
        searchType="credit card"

      />
    ),
    phone: (
      <RL1LineField
        RLstate={recLookupState}
        RLreducer={dispatchLookup}
        validLength={9}
        searchType="phone"
      />
    ),
    order: (
      <RL1LineField
        RLstate={recLookupState}
        RLreducer={dispatchLookup}
        validLength={8}
        searchType="order"
      />
    ),
    proID: (
      <RL1LineField
        RLstate={recLookupState}
        RLreducer={dispatchLookup}
        validLength={8}
        searchType="Pro ID"
      />
    ),
    commercialAcct: (
      <RL1LineField
        RLstate={recLookupState}
        RLreducer={dispatchLookup}
        validLength={8}
        searchType="Commercial Account"
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
        <form onSubmit={handleSubmit} className={classes.seventyContent}>
          <InPageTitleBox mainTitle="Select an option to search for receipt." />
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
              "proID",
              "Pro ID #",
              <TbHammer className={`${classes.icon}`} />
            )}
            {optionBtn(
              "commercialAcct",
              "Lowe's Commercial Account",
              <MdOutlineCorporateFare className={`${classes.icon}`} />
            )}
          </section>
          {searchComponents[recLookupState.activeType] ?? (
            <div>still working on it</div>
          )}
        </form>

        <FooterContainer>
          {!recLookupState.didSearch ? null : (
            <Link className={`baseButton primary large ${classes.button}`}>
              Continue
            </Link>
          )}
        </FooterContainer>
      </section>
    </section>
  );
};

export default ReceiptLookup;

/*



*/
