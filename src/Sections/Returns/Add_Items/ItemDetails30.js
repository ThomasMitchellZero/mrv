import classes from "./ItemDetails30.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

import disposSqueezer from "../functions/dispoSqueezer";

import { useReducer } from "react";

const ItemDetails30 = ({
  activeItem,
  dispatchActivePanels,
  returnsContext,
}) => {
  const sessionItem = returnsContext.session.items[activeItem];
  const dispatchSession = returnsContext.dispatchSession;

  // If the current item is deleted, send the user back to the Item Entry panel.
  if (!sessionItem)
    dispatchActivePanels({
      type: "SET_PANELS",
      payload: { set30: "item_entry" },
    });

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
    inputValid: true,
    localDisposObj: {...sessionItem.disposition}
  };

  // Reducer to control which tab and which defective reason are active.
  const dispositionReducer = (state, action) => {
    switch (action.type) {
      case "SET_TAB": {
        return { ...state, activeTab: action.payload };
      }
      case "SET_ACTIVE_DISPO": {
        return { ...state, defectiveReason: action.payload.dispoType };
      }
      case "SET_INPUTVALID": {
        return { ...state, inputValid: action.payload };
      }
      case "EDIT_DISPOS_OBJ": {
        return { ...state, localDisposObj: action.payload }
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
      type: "SET_ACTIVE_DISPO",
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

  // deal with changes to the input field
  const handleInputQty = (event) => {

    // check that the input quantity is a valid number
    const inputQty = parseInt(event.target.value);


    // Do I need this?  AFAICT any falsy values get squeezed out?
    if (typeof inputQty === "number") {

      let futureDispo = {
        ...dispoState.localDisposObj,
        [dispoState.defectiveReason]: inputQty,
      };

      // use the squeezer to remove any zero values.
      futureDispo = disposSqueezer(futureDispo).disposObj;

      // set the local state.
      dispatchDisposition({ type: "EDIT_DISPOS_OBJ", payload: futureDispo });

      // get difference between total items and sum of damage items
      const unassigned = sessionItem.quantity - disposSqueezer(futureDispo).totalDispoQty;


      // If input qty exceeds avail. items.
      if (unassigned < 0) {
        dispatchDisposition({ type: "SET_INPUTVALID", payload: false })

        console.log(Math.abs(unassigned));
      } else {

        // the number is valid so we dispatch
        dispatchSession({
          type: "ADD_ITEM",
          payload: {
            itemNum: activeItem,
            newDisposition: dispoState.localDisposObj,
            inputQty: null,
          },
        });

        // the input was valid, so we set the input validity state to true.
        dispatchDisposition({ type: "SET_INPUTVALID", payload: true });
      }
    }
  };

  return (
    <section className={classes.container}>
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
              <h5>Total Qty.</h5>
              <h2>{sessionItem.quantity}</h2>
            </div>
          </section>
          <div className={classes.itemCodes}>
            <h5>{`Item # ${sessionItem.itemNum}`}</h5>
            <div style={{ width: "0.75rem" }} />
            <h5>{`Model # ${sessionItem.modelNum}`}</h5>
          </div>
          <h4>{sessionItem.description}</h4>
        </section>

        {/* Return Reason Section */}
        <section className={classes.returnReason}>
          <p>Why is customer returning this item?</p>
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
          </section>
          <div className="divider" />
        </section>

        {/* Disposition Section */}
        {dispoState.activeTab !== "defective" ? null : (
          <section className={classes.defectiveDispo}>
            {/* Title, Input Field, and warning message */}
            <section className={classes.dispo_descriptor}>
              <div>
                <p> Select item condition and enter quantity</p>
                <input
                  type="number"
                  min={0}
                  max={20}
                  disabled={false}
                  className={`base_input`}
                  placeholder="Qty."
                  style={{ width: "4rem" }}
                  value={
                    dispoState.localDisposObj[dispoState.defectiveReason] || 0
                  }
                  onChange={handleInputQty}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                />
              </div>
              <p className="warning-text">Sample Warning Text</p>
            </section>

            {/* Disposition Buttons */}
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
        <button
          className={`baseButton primary large ${classes.continueButton}`}
        >
          Placeholder
        </button>
      </FooterContainer>
    </section>
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
