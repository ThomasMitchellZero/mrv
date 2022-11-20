import classes from "./ItemEntry30.module.css";

import { useReducer, useContext } from "react";

import ProductContext from "../../../store/product-context";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";


const ItemEntry30 = (props) => {
  // props inherited from the parent
  const returnsContext = props.returnsContext;
  const productContext = useContext(ProductContext);
  const dispatchSession = returnsContext.dispatchSession;

  const dispatchActivePanels = props.dispatchActivePanels;

  const defaultState = {
    itemNum: "",
    quantity: "",
    itemValid: false,
    formValid: false,
  };

  const formReducer = (state, action) => {
    switch (action.type) {

      case "ITEM_NUM":
        return {
          ...state,
          itemNum: action.payload.input,
          itemValid: action.payload.itemValid,
        };
      case "QUANTITY":
        return { ...state, quantity: action.payload };

      case "VALIDATE_FORM":
        let formValidity = state.quantity && state.itemValid ? true : false;
        return { ...state, formValid: formValidity };

      case "CLEAR_FORM":
        return defaultState

      default:
        return state;
    }
  };

  const [formState, dispatchForm] = useReducer(formReducer, defaultState);

  const productContextMatcher = (itemNum) => {
    if (productContext[itemNum]) {
      return productContext[itemNum];
    } else {
      return false;
    }
  };

  const itemNumChangeHandler = (event) => {
    const input = event.target.value;

    const itemValidity = productContextMatcher(input) ? true : false;

    dispatchForm({
      type: "ITEM_NUM",
      payload: { input: input, itemValid: itemValidity },
    });
    dispatchForm({ type: "VALIDATE_FORM" });
  };

  const quantityChangeHandler = (event) => {
    dispatchForm({
      type: "QUANTITY",
      payload: event.target.value,
    });
    dispatchForm({ type: "VALIDATE_FORM" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const itemPayload = {
      itemNum: formState.itemNum,
      quantity: formState.quantity
    }

    dispatchSession({type:"ADD_ITEM", payload: itemPayload})

    dispatchForm({ type: "CLEAR_FORM" });
  };

  //check and see what props.id is doing.  right now it seems useless?
  return (
    <form
      id={"item_form"}
      className={classes.container}
      onSubmit={submitHandler}
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
        Item Entry
      </TitleBar>
      <section className={classes.maincontent}>
        <div className={classes.subcontainer}>
          <input
            type="number"
            id="item_num"
            autoFocus={true}
            placeholder="Item #, UPC#, or Speed Code"
            className={`base_input ${classes.itemsearch}`}
            onChange={itemNumChangeHandler}
            value={formState.itemNum}
          />
          <p className={`warning_text`}>
            {formState.itemValid ? " " : "Enter Valid Item Number"}
          </p>
        </div>

        <div className={classes.subcontainer}>
          <label htmlFor="item_quantity">Qty.</label>
          <input
            type="number"
            id="item_quantity"
            className={`base_input ${classes.itemquantity}`}
            onChange={quantityChangeHandler}
            value={formState.quantity}
          />
        </div>
      </section>

      <FooterContainer>
        {formState.formValid ? (
          <button
            form="item_form"
            type="submit"
            className={`baseButton primary large ${classes.button}`}
          >
            Add Item
          </button>
        ) : null}
      </FooterContainer>
    </form>
  );
};

export default ItemEntry30;

/*

  const submitHandler = (event) => {
    event.preventDefault();
    returnsContext.handleAddItem(formState);

    dispatchForm({ type: "CLEAR_FORM" });
  };


*/
