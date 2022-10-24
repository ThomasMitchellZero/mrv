import classes from "./ItemEntry.module.css";

import { useState } from "react";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

// state and handlers to track the user inputs
const ItemEntry = (props) => {
  const [formState, setFormState] = useState({
    formItemNum: undefined,
    formQuantity: undefined,
  });

  const itemNumChangeHandler = (event) => {
    setFormState((prevState) => {
      return { ...prevState, formItemNum: event.target.value };
    });
  };

  const quantityChangeHandler = (event) => {
    setFormState((prevState) => {
      return { ...prevState, formQuantity: event.target.value };
    });
  };

  return (
    <form id={props.id} className={`thirty_panel`}>
      <TitleBar lefticon="back" lefturl="..">
        Item Entry
      </TitleBar>
      <section className={classes.maincontent}>
        <div className={classes.subcontainer}>
          <input
            type="text"
            id="item_num"
            placeholder="Item #, UPC#, or Speed Code"
            className={`base_input ${classes.itemsearch}`}
            onChange={itemNumChangeHandler}
            value={formState.formItemNum}
          />
          <p className={`warning_text`}>Placeholder</p>
        </div>

        <div className={classes.subcontainer}>
          <label htmlFor="item_quantity">Qty.</label>
          <input
            type="number"
            id="item_quantity"
            className={`base_input ${classes.itemquantity}`}
            onChange={quantityChangeHandler}
            value={formState.formQuantity}
          />
        </div>
      </section>

      <FooterContainer>
        <button
          form={props.id}
          type="submit"
          className={`baseButton primary large ${classes.button}`}
        >
          Add Item
        </button>
      </FooterContainer>
    </form>
  );
};

export default ItemEntry;
