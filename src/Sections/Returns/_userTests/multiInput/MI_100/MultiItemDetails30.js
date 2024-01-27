import classes from "./MultiItemDetails30.module.css";

import TitleBar from "../../../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../../../components/UI/PageLayout/FooterContainer";

import { useOutletContext } from "react-router";

import cloneDeep from "lodash.clonedeep";

import { useReducer, useRef, useState } from "react";

// Reducer to control which tab and which defective reason are active.

const MultiItemDetails30 = ({ rtrnIndexContext }) => {
  const returnsCtx = useOutletContext();
  const dispatchRtrn = returnsCtx.dispatchSession;
  const draftLocalCtx = cloneDeep(rtrnIndexContext);
  const activeItemNum = draftLocalCtx.activeItem;
  const draftSessionItem = cloneDeep(returnsCtx.session.items[activeItemNum]);

  const defaultState = {
    activeTab: "dwn",
    isValid: true,
    dwnDispos: {},
    ddDispos: {},
  };

  const [locStMI, setLocStMI] = useState(defaultState);

  const refDispoObj = {
    doesntWork: 0,
    broken: 0,
    unpackaged: 0,
    used: 0,
    missingParts: 0,
    cosmetic: 0,
    warranty: 0,
  };

  // function to set dispositions upon button click.
  const handleDispoClick = (name) => {};

  // button for setting the tab state in ReturnsIndex
  const tabButton = (reason, title) => {
    return (
      <button
        type="button"
        className={`baseButton secondary ${
          locStMI.activeTab === reason ? "active" : ""
        }`}
        onClick={() => {}}
      >
        {title}
      </button>
    );
  };

  // reusable button to set local Disposition to be edited.
  const dwnButton = (label, reasonKey) => {
    const isActive = locStMI.dwnDispos[reasonKey] ? "active" : "";

    return (
      <button
        type="button"
        onClick={() => {
          handleDispoClick(reasonKey);
        }}
        id={reasonKey}
        className={`baseButton secondary ${isActive}`}
      >
        {`${label}`}
      </button>
    );
  };

  // deal with changes to the input field
  const handleInputQty = (event) => {
    const rawIn = parseInt(event.target.value);
    // Input might be empty so if NaN, set it to 0.
    const inputQty = isNaN(rawIn) ? 0 : rawIn;
  };

  return (
    <section className={classes.container}>
      <TitleBar title="Item Details" />
      <section className={classes.mainContent}>
        {/* Item Description */}
        <section className={classes.itemDescription}>
          <section className={classes.picAndQty}>
            <img src={draftSessionItem.img} alt="Product"></img>
            <div>
              <h5>Total Qty.</h5>
              <h2>{draftSessionItem.quantity}</h2>
            </div>
          </section>
          <div className={classes.itemCodes}>
            <h5>{`Item # ${draftSessionItem.itemNum}`}</h5>
            <div style={{ width: "0.75rem" }} />
            <h5>{`Model # ${draftSessionItem.modelNum}`}</h5>
          </div>
          <h4>{draftSessionItem.description}</h4>
        </section>

        {/* Return Reason Section */}
        <section className={classes.returnReason}>
          <p>Why is customer returning this item?</p>
          <section>
            {tabButton("unwanted", "Didn't Want")}
            {tabButton("defective", "Damaged/Defective")}
          </section>
          <div className="divider" />
        </section>

        {/* Disposition Section */}

        {locStMI.activeTab === "dwn" ? (
          <section></section>
        ) : (
          <section className={classes.defectiveDispo}>
            {/* Title, Input Field, and warning message */}

            {/* Disposition Buttons */}
            <section className={classes.dispoColumns}>
              <section></section>
              <section></section>
            </section>
          </section>
        )}
      </section>

      <FooterContainer></FooterContainer>
    </section>
  );
};

export default MultiItemDetails30;

/*

<section className={classes.dispo_descriptor}>
              <div>
                <p> Select item condition and enter quantity</p>
                <input
                  type="number"
                  disabled={false}
                  ref={inputElement}
                  className={`base_input`}
                  placeholder="Qty."
                  min={0}
                  style={{ width: "4rem" }}
                  value={
                    detailsState.localDisposObj[detailsState.defectiveReason] ||
                    ""
                  }
                  onChange={handleInputQty}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                />
              </div>
              <p className="warning-text">
                {detailsState.inputValid
                  ? ""
                  : `Item Total Exceeded.  Max value: ${detailsState.undamagedItems}`}
              </p>
            </section>


*/
