import classes from "./InvoiceEntry30.module.css";
import { useReducer, useContext } from "react";

import InvoiceContext from "../../../store/invoice-context";
import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";

const InvoiceEntry30 = (props) => {
  const returnsContext = props.returnsContext;
  const sessionInvoices = returnsContext.session.invoices;
  const invoiceContext = useContext(InvoiceContext);

  const dispatchActivePanels = props.dispatchActivePanels;
  const dispatchSession = returnsContext.dispatchSession;

  //// FORM STATE AND REDUCER ////

  const defaultState = {
    invoiceNum: "",
    invoiceInContext: false,
    invoiceIsUnique: false,
    formValid: false,
  };

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
          ...defaultState,
        };

      default:
        return state;
    }
  };

  const [formState, dispatchForm] = useReducer(formReducer, {
    ...defaultState,
  });

  // Handles user inputs to the invoice.
  const invoiceNumChangeHandler = (event) => {
    const input = event.target.value.toUpperCase();

    const inputObj = {
      input: input,
      isUnique: false,
      isInContext: false,
    };

    if (invoiceContext[input]) {
      inputObj.isInContext = true;
    }
    if (!sessionInvoices[input]) {
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

    if (formState.formValid) {
      const thisInvoiceInContext =
        invoiceContext[formState.invoiceNum]

      // conditional handling for Generic SOS
      //TODO - rewrite as ternary?
      let activeModal = null;

      if (thisInvoiceInContext.invoiceDetails?.genericSOS) {

        activeModal = {
          type: "genericSOS",
          refObj: {
            products: thisInvoiceInContext.products,
            setPanels: dispatchActivePanels,
          },
        };
      }

      dispatchSession({
        type: "ADD_INVOICE",
        payload: [formState.invoiceNum],
      });
      dispatchSession({
        type: "SET_MODAL",
        payload: activeModal,
      });
      dispatchForm({ type: "CLEAR_INPUTS" });
    }
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
        <p className={`warning-text`}>{errorTextHandler()}</p>
      </section>
      <FooterContainer>
        {formState.formValid ? (
          <button
            form="invoiceForm"
            type="submit"
            disabled={!formState.formValid}
            className={`baseButton primary large contained30`}
          >
            Add Invoice
          </button>
        ) : null}
      </FooterContainer>
    </form>
  );
};

export default InvoiceEntry30;
