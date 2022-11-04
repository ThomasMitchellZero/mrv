import classes from "./ItemEntry30.module.css";

import { useReducer } from "react";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const formReducer = (state, action) => {
  switch (action.type) {
    case "ITEM_NUM":
      return {
        ...state,
        itemNum: action.payload.input,
        itemValid: action.payload.validity,
      };
    case "QUANTITY":
      return { ...state, quantity: action.payload };
    case "VALIDATE_FORM":
      let validity = state.quantity && state.itemValid ? true : false;
      return { ...state, formValid: validity };
    case "CLEAR_FORM":
      return { itemNum: "", quantity: "", itemValid: false, formValid: false };
    default:
      return state;
  }
};

// props inherited from the parent, since this is an Outlet.

const ItemEntry30 = (props) => {
  // props inherited from the parent, since this is an Outlet.
  const returnsContext = props.returnsContext;

  console.log(returnsContext)

  const dispatchActivePanels = props.dispatchActivePanels;

  const [formState, dispatchForm] = useReducer(formReducer, {
    itemNum: "",
    quantity: "",
    itemValid: false,
    formValid: false,
  });

  const itemNumChangeHandler = (event) => {
    const input = event.target.value;

    const validity = returnsContext.productContextMatcher(input) ? true : false;

    dispatchForm({
      type: "ITEM_NUM",
      payload: { input: input, validity: validity },
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
    returnsContext.handleAddItem(formState);

    dispatchForm({ type: "CLEAR_FORM" });
  };

  // buttons for the input form
  const activeButton = (
    <button
      form={props.id}
      type="submit"
      className={`baseButton primary large ${classes.button}`}
    >
      Add Item
    </button>
  );

  const inactiveButton = (
    <button
      type="button"
      disabled={true}
      form={props.id}
      className={`baseButton primary__disabled large ${classes.button}`}
    >
      Add Item
    </button>
  );

  return (
    <form id={props.id} className={classes.container} onSubmit={submitHandler}>
      <TitleBar
        lefticon="back"
        left_onClick={() =>
          dispatchActivePanels({
            type: "setPanels",
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
        {formState.formValid ? activeButton : inactiveButton}
      </FooterContainer>
    </form>
  );
};

export default ItemEntry30;

/*

*/
