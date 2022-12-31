import classes from "./RL1LineField.module.css";

import invoiceMatching from "./invoiceMatching";

import { useReducer } from "react";

const defaultState = {
  inputs: "",
  inputsValidity: false,
  warningVisible: false,
};

const RL_Reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      return { ...state, ...action.payload };
    }
    case "SHOW_WARNING": {
      return { ...state, warningVisible: action.payload };
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
  searchType,
  invalidMsg,
  fieldLabel,
  fieldPlaceholder,
  didMinimum,
}) => {
  const [searchCompState, dispatchSearchComp] = useReducer(
    RL_Reducer,
    defaultState
  );

  const handleChange = (event) => {
    const inputText = event.target.value;
    const validity = inputText.length >= validLength;

    dispatchSearchComp({
      type: "CHANGE_INPUT",
      payload: {
        inputs: inputText,
        inputsValidity: validity,
        warningVisible: false,
      },
    });
  };

  // When the user presses the button...
  const handleSubmit = (event) => {
    event.preventDefault();
    // user can continue after 1 search.
    didMinimum({ type: "MINIMUM_EFFORT" });
    // each field searches via a different function.  Passes this function to primary InvoiceMatcher
    invoiceMatching({
      searchType: searchType,
      userInput: searchCompState.inputs,
    });
    dispatchSearchComp({ type: "SUBMIT" });
  };

  const handleBlur = () => {
    dispatchSearchComp({
      type: "SHOW_WARNING",
      payload: !searchCompState.inputsValidity,
    });
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
      ></input>
      <p className="warning-text">
        {searchCompState.warningVisible ? invalidMsg : ""}
      </p>
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
