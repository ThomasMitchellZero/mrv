import classes from "./InvoiceEntry30.module.css";
import { useReducer, useContext } from "react";

import InvoiceContext from "../../../store/invoice-context";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const InvoiceEntry30 = (props) => {
  const returnsContext = props.returnsContext;
  const sessionInvoices = returnsContext.session.invoices;
  const invoiceContext = useContext(InvoiceContext);

  const dispatchActivePanels = props.dispatchActivePanels;

//// FORM STATE AND REDUCER ////

const formReducer = (state, action) => {
  switch (action.type) {
    case "INVOICE_NUM":

      return {
        ...state,
        invoiceNum: action.payload.input,
        invoiceInContext: action.payload.isInContext,
        invoiceIsUnique: action.payload.isUnique,
      };

    case "VALIDATE_FORM":
      // currently overkill, but will need later if I add date/store.
      const formValidity =
        state.invoiceInContext && state.invoiceIsUnique ? true : false;
      return {
        ...state,
        formValid: formValidity,
      };

    case "CLEAR_INPUTS":
      return {
        ...state,
        invoiceNum: "",
        invoiceInContext: false,
        invoiceIsUnique: false,
      };

    default:
      return state;
  }
};

  const [formState, dispatchForm] = useReducer(formReducer, {
    invoiceNum: "",
    invoiceInContext: false,
    invoiceIsUnique: false,
    formValid: false,
  });


  // Handles user inputs to the invoice.
  const invoiceNumChangeHandler = (event) => {
    const input = event.target.value.toUpperCase();

      const inputObj = {
        input: input,
        isUnique: false,
        isInContext: false,
      };

      if(invoiceContext[input]){
        inputObj.isInContext = true
      }
      if(!sessionInvoices[input]){
        inputObj.isUnique = true;
      }

    dispatchForm({
      type: "INVOICE_NUM",
      payload: inputObj,
    });
    dispatchForm({ type: "VALIDATE_FORM" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatchForm({ type: "CLEAR_INPUTS" });
  };

  const errorTextHandler = () => {
    if (!formState.invoiceInContext) {
      return "Enter a valid invoice number";
    } else if (!formState.invoiceIsUnique) {
      return "This invoice has already been entered";
    } else return "";
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
            type: "SET_PANELS",
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
        <p className={`warning_text ${classes.warningText}`}>
          {errorTextHandler()}
        </p>
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
