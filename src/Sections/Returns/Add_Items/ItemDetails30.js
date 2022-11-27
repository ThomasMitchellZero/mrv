import classes from "./ItemDetails30.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import ItemEntry30 from "./ItemEntry30";

// BUG Reminder:  If I delete the current item being referenced in ItemDetails, the program crashes because ItemDetails is now referencing something that's no longer there.  

const ItemDetails30 = ({
  activeItem,
  dispatchActivePanels,
  returnsContext,
}) => {

  const sessionItem = returnsContext.session.items[activeItem];

  return (
    <form className={classes.container}>
      <TitleBar
        lefticon="close"
        left_onClick={() =>
          dispatchActivePanels({
            type: "SET_PANELS",
            payload: { set30: "item_entry" },
          })
        }
      >
        Item Details
      </TitleBar>
      <section className={classes.mainContent}>
        <section className={classes.picAndQty}>
            <img src={sessionItem.img} alt="Product"></img>
            <div>
                <h3>Total Qty.</h3>
                <h1>{sessionItem.quantity}</h1>
            </div>
        </section>
      </section>
      <FooterContainer>
        <button className={`baseButton primary large ${classes.button}`}>
          Placeholder
        </button>
      </FooterContainer>
    </form>
  );
};

export default ItemDetails30;
