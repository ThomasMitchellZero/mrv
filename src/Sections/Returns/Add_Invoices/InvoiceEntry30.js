import classes from "./InvoiceEntry30.module.css";
import { useReducer } from "react";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INVOICE_NUM":
      return {
        ...state,
        invoiceNum: action.payload.input,
        invoiceValid: action.payload.validity,
      };

    case "VALIDATE_FORM":
      // currently overkill, but will need later if I add date/store.
      const formValidity = state.invoiceValid ? true : false;
      return {
        ...state,
        formValid: formValidity,
      };

    case "CLEAR_INPUTS":
      return {
        ...state,
        invoiceNum: "",
        invoiceValid: false,
        formValid: false,
      };

    default:
      return state;
  }
};

const InvoiceEntry30 = (props) => {
  const returnsContext = props.returnsContext;

  const dispatchActivePanels = props.dispatchActivePanels;

  const [formState, dispatchForm] = useReducer(formReducer, {
    invoiceNum: "",
    invoiceValid: false,
    formValid: false,
  });

  // Handles user inputs to the invoice.
  const invoiceNumChangeHandler = (event) => {
    const input = event.target.value.toUpperCase();
    const validity = returnsContext.invoiceContextMatcher(input) ? true : false;

    dispatchForm({
      type: "INVOICE_NUM",
      payload: { input: input, validity: validity },
    });
    dispatchForm({ type: "VALIDATE_FORM" });
  };

  const submitHandler = () => {
    dispatchForm({type: "CLEAR_INPUTS"})
  };

  return (
    <form
      onSubmit={submitHandler}
      id="invoiceForm"
      className={classes.container}
    >
      <TitleBar
        lefticon="back"
        left_onClick={() =>
          dispatchActivePanels({
            type: "setPanels",
            payload: { set30: "actions" },
          })
        }
      >
        Enter Receipt
      </TitleBar>
      <section>
        <input
          type="text"
          placeholder="Enter Invoice #"
          onChange={invoiceNumChangeHandler}
          value={formState.invoiceNum}
          className={`base_input`}
        />
      </section>
      <FooterContainer>
        {formState.formValid ? (
          <button
            form="invoiceForm"
            type="submit"
            className={`baseButton primary large ${classes.button}`}
          >
            Add Invoice
          </button>
        ) : null}
      </FooterContainer>
    </form>
  );
};

export default InvoiceEntry30;
