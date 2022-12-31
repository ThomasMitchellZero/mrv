import classes from "./RL_AllSearchFields.module.css";

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
    onSubmit,
    validityFunc,
    fieldLabel,
    fieldPlaceholder,
    customFields = null,
  }) => {
    const handleChange = (event) => {
      const inputText = event.target.value;
      const validity = validityFunc(inputText);
      dispatchSearchComp({
        type: "CHANGE_INPUT",
        payload: { inputs: inputText, inputsValidity: validity },
      });
    };


    const handleSubmit = (event) => {
      event.preventDefault();
      // user can continue after 1 search.
      minEffort(true)
      // 
      invoiceMatching();
    };
    return (
      <form className={`${classes.container}`}>
        <h4>{fieldLabel}</h4>
        <input
          className={`${classes.input}`}
          onChange={handleChange}
          value={searchCompState.inputs}
          placeholder={fieldPlaceholder}
        ></input>
        <button type="submit" onSubmit={handleSubmit}></button>
      </form>
    );
  };

  const outObj = {
    creditCard: baseSearcher({}),
  };
};

export default RLsearchFielder;
