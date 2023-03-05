import classes from "./ItemEntry30.module.css";

import { useReducer, useContext } from "react";

import ProductContext from "../../../store/product-context";
import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";

import cloneDeep from "lodash.clonedeep";

const ItemEntry30 = (props) => {
  // props inherited from the parent
  const productContext = useContext(ProductContext);
  const returnsContext = props.returnsContext;
  const sessionItems = cloneDeep(returnsContext.session.items);
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
        return defaultState;

      default:
        return state;
    }
  };

  const [formState, dispatchForm] = useReducer(formReducer, defaultState);

  //TODO - this could be cleaner. 

  // checks to see if product exists in the Products context.
  const productContextMatcher = (itemNum) => {
    if (productContext[itemNum]) {
      return productContext[itemNum];
    } else {
      return false;
    }
  };  // I think this function is completely useless.                                                                      

  //updates the local state whenever the Item Num input changes.
  const itemNumChangeHandler = (event) => {
    const input = event.target.value;

    const itemValidity = productContextMatcher(input) ? true : false;

    dispatchForm({
      type: "ITEM_NUM",
      payload: { input: input, itemValid: itemValidity },
    });
    dispatchForm({ type: "VALIDATE_FORM" });
  };

  //updates the local state whenever the Quantity input changes.
  const quantityChangeHandler = (event) => {
    dispatchForm({
      type: "QUANTITY",
      payload: event.target.value,
    });
    dispatchForm({ type: "VALIDATE_FORM" });
  };

  // Adds the item and quantity to the top Returns state via dispatch.
  const submitHandler = (event) => {
    event.preventDefault();

    // If ✓ needed b/c 'Enter' key dispatches even if form is invalid.
    if (formState.formValid) {

      const outQty = parseInt(formState.quantity);
      const outItemNum = formState.itemNum

      // Copy item if it already exists, otherwise create a new, empty one.
      const outItemObj = sessionItems[outItemNum] ?? {
        ...productContext[outItemNum],
        quantity: 0,
        disposition: { unwanted: 0 },
      };

      // if item hasn't Unwanted dispo type, create it w/ value: 0
      outItemObj.disposition.unwanted ??= 0;

      // populate properties with new quantity.
      outItemObj.disposition.unwanted += outQty;
      outItemObj.quantity += outQty;

      const itemPayload = {
        [outItemNum]: outItemObj,
      };

      dispatchSession({
        type: "ADD_ITEM",
        payload: itemPayload,
      });

      dispatchForm({ type: "CLEAR_FORM" });
    }
  };

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
          <p className={`warning-text`}>
            {formState.itemValid ? " " : "Enter Valid Item Number"}
          </p>
        </div>

        <div className={classes.subcontainer}>
          <label htmlFor="item_quantity">
            <h5>Qty.</h5>
          </label>
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
            disabled={!formState.formValid}
            className={`baseButton primary large contained30`}
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
