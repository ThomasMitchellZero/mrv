import classes from "./ItemEntry.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const ItemEntry = (props) => {
  return (
    <form id={props.id} className={`thirty_panel`}>
      <TitleBar lefticon="back" lefturl="..">
        Item Entry
      </TitleBar>
      <section className={classes.maincontent}>
        <input
          type="text"
          id="item_num"
          placeholder="Item #, UPC#, or Speed Code"
          className={`base_input ${classes.itemsearch}`}
        ></input>
        <div className={classes.quantity_container}>
          <label htmlFor="item_quantity">Qty.</label>
          <input
            type="number"
            id="item_quantity"
            className={`base_input ${classes.itemquantity}`}
          ></input>
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
