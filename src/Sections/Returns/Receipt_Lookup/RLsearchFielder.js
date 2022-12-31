import classes from "./RLsearchFielder.module.css";

import invoiceMatching from "./invoiceMatching";

import { useReducer } from "react";

const defaultState = {
  inputs: "",
  inputsValidity: false,
};

const RL_Reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      return {};
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const RLsearchFielder = ({ activeType, minEffort }) => {
  const [searchCompState, dispatchSearchComp] = useReducer(RL_Reducer, {
    defaultState,
  });

  const baseSearcher = ({
    invoMatchStr,
    validityFunc,
    invalidMsg,
    fieldLabel,
    fieldPlaceholder,
  }) => {
    const handleChange = (event) => {
      const inputText = event.target.value;
      const validity = validityFunc(inputText);
      dispatchSearchComp({
        type: "CHANGE_INPUT",
        payload: { inputs: inputText, inputsValidity: validity },
      });
    };

    const thisMatchFunc = (currInvo) => {
      if (currInvo[invoMatchStr] ?? false) {
        return currInvo;
      }
    };
    // When the user presses the button...
    const handleSubmit = (event) => {
      event.preventDefault();
      // user can continue after 1 search.
      minEffort(true);
      // each field searches via a different function.  Passes this function to primary InvoiceMatcher
      invoiceMatching(thisMatchFunc);
    };

    const handleBlur = () => {};

    return (
      <form className={`${classes.container}`}>
        <h4>{fieldLabel}</h4>
        <input
          className={`${classes.input}`}
          onChange={handleChange}
          value={searchCompState.inputs}
          placeholder={fieldPlaceholder}
        ></input>
        <p class="warning-text">{}</p>
        <button
          className={`baseButton primary large`}
          type="submit"
          onSubmit={handleSubmit}
        >
          Search
        </button>
      </form>
    );
  };

  const outObj = {
    creditCard: {
      invoMatchStr: `invoiceDetails.payment.credit.${searchCompState.input}`,
      validityFunc: "",
      invalidMsg: "",
      fieldLabel: "Search Credit",
      fieldPlaceholder: "enter cc",
    },
  };

  return outObj[activeType] ?? <div>still working on it</div>;
};

export default RLsearchFielder;

/*

    creditCard: baseSearcher({
      thisMatchFunc: function (invoiceNum, matchPath) {
        if (invoiceNum?.[matchPath]) return invoiceNum;
      },

*/
