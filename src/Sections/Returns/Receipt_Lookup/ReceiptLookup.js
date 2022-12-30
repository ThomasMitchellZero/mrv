import classes from "./ReceiptLookup.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import MiniUnmatchedLI from "../../../components/UI/MiniItemLI";
import MessageRibbon from "../../../components/UI/MessageRibbon";

import { useReducer } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";


const defaultState = {
  activeType: "creditCard",
  fieldInput:"",
  inputValid: false,
  didSearch: false
}

const lookupReducer = (action, state) => {
  switch (action.type) {
    case "SET_SEARCH": {
      return {...state, activeType: action.payload};
    }

    case "FIELD_INPUT":{
      return{}
    }

    case "MINIMUM_EFFORT":{
      return{}
    }

    default:
      return state;
  }
};

const ReceiptLookup = () => {
  const navigate = useNavigate();

  const unmatchedArr = Object.values(useOutletContext().session.unmatched);
  

  const unmatchedLIarr = unmatchedArr.map((iObj) => {
    return (
      <MiniUnmatchedLI
        key={iObj.itemNum}
        itemObj={iObj}
        hasMessage={
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
          <h2>Look Up Receipts</h2>
        </section>

        <FooterContainer></FooterContainer>
      </section>
    </section>
  );
};

export default ReceiptLookup;

/*


 */
