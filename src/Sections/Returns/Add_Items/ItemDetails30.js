import classes from "./ItemDetails30.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import ItemEntry30 from "./ItemEntry30";

import { useReducer } from "react";

// BUG Reminder:  If I delete the current item being referenced in ItemDetails, the program crashes because ItemDetails is now referencing something that's no longer there.

const ItemDetails30 = ({
  activeItem,
  dispatchActivePanels,
  returnsContext,
}) => {
  const sessionItem = returnsContext.session.items[activeItem];

  const refDispoObj = {
    doesntWork: 0,
    broken: 0,
    unpackaged: 0,
    used: 0,
    missingParts: 0,
    cosmetic: 0,
    warranty: 0,
  };

  const defaultState = {
    activeTab: "unwanted",
    defectiveReason: "doesntWork",
    newDisposition: {},
  };

  const dispositionReducer = (state, action) => {
    switch (action.type) {
      case "SET_TAB": {
        return { ...state, activeTab: action.payload };
      }
      case "SET_DISPOSITION": {
        return { ...state, defectiveReason: action.payload.dispoType };
      }
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [dispoState, dispatchDisposition] = useReducer(
    dispositionReducer,
    defaultState
  );

  /*
    300: {
    img: hoses_img,
    price: 15.75,                                       
    itemNum: "300",
    modelNum: "DR3345",
    description: "Replacement hoses for Samsung refrigerator",
    categories: [],
  },
  
  */

  const handleDispoClick = (name) => {
    dispatchDisposition({
      type: "SET_DISPOSITION",
      payload: { dispoType: name },
    });
  };

  // reusable button to set item's dispositions
  const DispoButton = (label, reasonKey) => {

    const isActive = dispoState.defectiveReason === reasonKey ? "active" : "";
    return (
      <button
        type="button"
        onClick={() => {
          handleDispoClick(reasonKey);
        }}
        id={reasonKey}
        className={`baseButton secondary ${isActive}`}
      >
        {label}
      </button>
    );
  };

  const handleInputQty = () => {
    // deal with changes to the input field
  };

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
        {/* Item Description */}
        <section className={classes.itemDescription}>
          <section className={classes.picAndQty}>
            <img src={sessionItem.img} alt="Product"></img>
            <div>
              <h3>Total Qty.</h3>
              <h1>{sessionItem.quantity}</h1>
            </div>
          </section>
          <div className={classes.itemCodes}>
            {`Item # ${sessionItem.itemNum}`}
            <div style={{ width: "0.75rem" }} />
            {`Model # ${sessionItem.modelNum}`}
          </div>
          <p className={classes.description}>{sessionItem.description}</p>
        </section>

        {/* Return Reason Section */}
        <section className={classes.returnReason}>
          <h1>Why is customer returning this item?</h1>
          <section>
            <button
              type="button"
              className={`baseButton secondary ${
                dispoState.activeTab === "unwanted" ? "active" : ""
              }`}
              onClick={() => {
                dispatchDisposition({
                  type: "SET_TAB",
                  payload: "unwanted",
                });
              }}
            >
              Didn't Want
            </button>
            <button
              type="button"
              className={`baseButton secondary ${
                dispoState.activeTab === "defective" ? "active" : ""
              }`}
              onClick={() => {
                dispatchDisposition({
                  type: "SET_TAB",
                  payload: "defective",
                });
              }}
            >
              Damaged/Defective
            </button>
            <input
              disabled={true}
              className={`base_input`}
              placeholder="Qty."
              style={{ width: "4rem" }}
              value={sessionItem.disposition[dispoState.defectiveReason]}
            />
          </section>
          <div className="divider" />
        </section>

        {/* Disposition Section */}
        {dispoState.activeTab !== "defective" ? null : (
          <section className={classes.defectiveDispo}>
            <section className={classes.dispoColumns}>
              <section>
                {DispoButton("Doesn't Work", "doesntWork")}
                {DispoButton("Broken", "broken")}
                {DispoButton("Out Of Package", "unpackaged")}
                {DispoButton("Warranty", "warranty")}
              </section>
              <section>
                {DispoButton("Missing Parts", "missingParts")}
                {DispoButton("Cosmetic", "cosmetic")}
                {DispoButton("Used", "used")}
              </section>
            </section>
          </section>
        )}
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

/*

  const refDispoObj = {
    doesntWork: 0,
    broken: 0,
    unpackaged: 0,
    warranty: 0,

    missingParts: 0,
    cosmetic: 0,
    used: 0,

  };


*/
