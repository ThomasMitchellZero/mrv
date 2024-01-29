import classes from "./MultiItemDetails30.css";

import TitleBar from "../../../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../../../components/UI/PageLayout/FooterContainer";

import { useOutletContext } from "react-router";

import cloneDeep from "lodash.clonedeep";

import { useReducer, useRef, useState } from "react";

// Reducer to control which tab and which defective reason are active.

const MultiItemDetails30 = ({ rtrnIndexContext }) => {
  const returnsCtx = useOutletContext();
  const dispatchRtrn = returnsCtx.dispatchSession;
  const activeItemNum = rtrnIndexContext.activeItem;
  const draftSessionItem = cloneDeep(returnsCtx.session.items[activeItemNum]);

  const defaultState = {
    activeTab: "dwn",
    isValid: true,
    dwnDispos: {
      tooHeavy: false,
      wrongSize: false,
      wrongColor: false,
      betterPrice: false,
    },
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

  // button for setting the tab state in ReturnsIndex
  const tabButton = (reason, title) => {
    return (
      <button
        type="button"
        className={`baseButton secondary ${
          locStMI.activeTab === reason ? "active" : ""
        }`}
        onClick={() => {
          const draftLocStMI = cloneDeep(locStMI);
          draftLocStMI.activeTab = reason;
          setLocStMI(draftLocStMI);
        }}
      >
        {title}
      </button>
    );
  };

  const dwnButtonValues = [
    { dwnReasonKey: "tooHeavy", dwnBtnLabel: "Too Heavy" },
    { dwnReasonKey: "wrongSize", dwnBtnLabel: "Wrong Size" },
    { dwnReasonKey: "wrongColor", dwnBtnLabel: "Wrong Color" },
    { dwnReasonKey: "betterPrice", dwnBtnLabel: "Found Better Price" },
  ];

  const handleDwnClick = (dwnKey) => {
    const draftLocStMI = cloneDeep(locStMI);
    //toggle the boolean value
    draftLocStMI.dwnDispos[dwnKey] = !draftLocStMI.dwnDispos[dwnKey];
    setLocStMI(draftLocStMI);
  };

  // reusable button to set local Disposition to be edited.
  const dwnButton = (dwnBtnObj) => {
    const isActive = locStMI.dwnDispos[dwnBtnObj.dwnReasonKey] ? "active" : "";

    return (
      <button
        type="button"
        onClick={() => {
          handleDwnClick(dwnBtnObj.dwnReasonKey);
        }}
        key={dwnBtnObj.dwnReasonKey}
        className={`baseButton secondary ${isActive}`}
      >
        {`${dwnBtnObj.dwnBtnLabel}`}
      </button>
    );
  };

  const dwnButtonsArr = dwnButtonValues.map((dwnObj) => {
    return dwnButton(dwnObj);
  });

  // deal with changes to the input field
  const handleInputQty = (event) => {
    const rawIn = parseInt(event.target.value);
    // Input might be empty so if NaN, set it to 0.
    const inputQty = isNaN(rawIn) ? 0 : rawIn;
  };

  return (
    <section className={`multiItem30 container`}>
      <TitleBar title="Item Details" />
      <section className={`mainContent`}>
        {/* Item Description */}
        <section className={`itemDescription`}>
          <section className={`picAndQty`}>
            <img src={draftSessionItem.img} alt="Product"></img>
            <div>
              <h5>Total Qty.</h5>
              <h2>{draftSessionItem.quantity}</h2>
            </div>
          </section>
          <div className={'itemCodes'}>
            <h5>{`Item # ${draftSessionItem.itemNum}`}</h5>
            <div style={{ width: "0.75rem" }} />
            <h5>{`Model # ${draftSessionItem.modelNum}`}</h5>
          </div>
          <h4>{draftSessionItem.description}</h4>
        </section>

        {/* Return Reason Section */}
        <section className={`returnReason`}>
          <p>Why is customer returning this item?</p>
          <section>
            {tabButton("dwn", "Didn't Want / Need")}
            {tabButton("dd", "Damaged / Defective")}
          </section>
          <div className="divider" />
        </section>

        {/* Disposition Section */}

        {locStMI.activeTab === "dwn" ? (
          <section>{dwnButtonsArr}</section>
        ) : (
          <section className={`defectiveDispo`}>
            {/* Title, Input Field, and warning message */}

            {/* Disposition Buttons */}
            <section className={`dispoColumns`}>
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
