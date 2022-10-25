import classes from "./ItemEntry.module.css";

import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

// props inherited from the parent, since this is an Outlet.
const ItemEntry = (props) => {
  const scanReceiptsContext = useOutletContext();

  // state and handlers to track the user inputs
  const [formState, setFormState] = useState({
    formItemNum: "",
    formQuantity: "",
    formFilled: false,
  });

  // updates the formFilled property after checking that both inputs are filled
  const formFillChecker = () => {
    const isFilled =
      formState.formItemNum !== "" && formState.formQuantity !== "";

    setFormState((prevState) => {
      return { ...prevState, formFilled: isFilled };
    });
  };

  // triggers formFillChecker whenever either input field changes.
  useEffect(formFillChecker, [formState.formItemNum, formState.formQuantity]);

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

  const submitHandler = (event) => {
    event.preventDefault();
    scanReceiptsContext.handleAddItem(formState);

    setFormState({ formQuantity: "", formItemNum: "" });
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
      disabled="true"
      form={props.id}
      className={`baseButton primary__disabled large ${classes.button}`}
    >
      Add Item
    </button>
  );

  return (
    <form id={props.id} className={`thirty_panel`} onSubmit={submitHandler}>
      <TitleBar lefticon="back" lefturl="..">
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
        {formState.formFilled ? activeButton : inactiveButton}
      </FooterContainer>
    </form>
  );
};

export default ItemEntry;

/*

        <button
          form={props.id}
          type="submit"
          className={`baseButton primary large ${classes.button}`}
        >
          Add Item
        </button>

*/
