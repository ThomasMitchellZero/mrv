import classes from "./RL1LineField.module.css";

import invoiceMatching from "./invoiceMatching";

import { useReducer } from "react";

const defaultState = {
  inputs: "",
  inputsValidity: false,
};

const RL_Reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      return { ...state, ...action.payload };
    }
    case "SUBMIT": {
      return { ...defaultState };
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const RL_1LineField = ({
  validLength,
  invoMatchStr,
  invalidMsg,
  fieldLabel,
  fieldPlaceholder,
  didMinimum,
}) => {
  const [searchCompState, dispatchSearchComp] = useReducer(RL_Reducer, {
    defaultState,
  });

  const invoMatch = (currInvo) => {
    if (currInvo[invoMatchStr] ?? false) {
      return currInvo;
    }
  };

  let errorText = "";

  const handleChange = (event) => {
    const inputText = event.target.value;
    const validity = inputText >= validLength;
    dispatchSearchComp({
      type: "CHANGE_INPUT",
      payload: { inputs: inputText, inputsValidity: validity },
    });
  };

  // When the user presses the button...
  const handleSubmit = (event) => {
    event.preventDefault();
    // user can continue after 1 search.
    didMinimum();
    // each field searches via a different function.  Passes this function to primary InvoiceMatcher
    invoiceMatching(invoMatch);
  };

  const handleBlur = () => {
    errorText = searchCompState.inputsValidity ? "" : invalidMsg;
  };

  return (
    <form className={`${classes.container}`}>
      <h4>{fieldLabel}</h4>
      <input
        className={`${classes.input}`}
        onChange={handleChange}
        value={searchCompState.inputs}
        placeholder={fieldPlaceholder}
        onBlur={handleBlur}
        onFocus={() => {
          errorText = "";
        }}
      ></input>
      <p class="warning-text">{errorText}</p>
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

export default RL_1LineField;
