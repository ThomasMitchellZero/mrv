import classes from "./MultiItemDetails30.css";

import TitleBar from "../../../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../../../components/UI/PageLayout/FooterContainer";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";

import { useOutletContext } from "react-router";

import cloneDeep from "lodash.clonedeep";

import { useReducer, useRef, useState } from "react";

// Reducer to control which tab and which defective reason are active.

const MultiItemDetails30 = ({ rtrnIndexContext }) => {
  const returnsCtx = useOutletContext();
  const dispatchRtrn = returnsCtx.dispatchSession;
  const sActiveItemNum = rtrnIndexContext.activeItem;
  const oActiveItem = returnsCtx.session.items[sActiveItemNum];
  const nItemQty = oActiveItem.quantity;

  const defaultState = {
    activeTab: "dwn",
    isValid: true,
    dwnQty: 0,
    ddQty: 0,
    dwnDispos: {
      tooHeavy: { selected: false, title: "Too Heavy" },
      wrongSize: { selected: false, title: "Wrong Size" },
      wrongColor: { selected: false, title: "Wrong Color" },
      betterPrice: { selected: false, title: "Found Better Price" },
    },
    ddDispos: {
      noWorky: { qty: null, title: "Doesn't Work" },
      missingParts: { qty: null, title: "Missing Parts" },
      broken: { qty: null, title: "Broken" },
      cosmetic: { qty: null, title: "Cosmetic" },
      crackedBowl: { qty: null, title: "Cracked Bowl" },
      crackedTank: { qty: null, title: "Cracked Tank" },
      leaking: { qty: null, title: "Leaking" },
    },
  };

  //Shared Functions

  const [locStMI, setLocStMI] = useState(defaultState);

  const totalDDqtys = (draftLocSt) => {
    let outTotalQty = 0;
    for (const thisDispo of Object.keys(draftLocSt.ddDispos)) {
      if (thisDispo.qty && typeof thisDispo.qty === "number") {
        outTotalQty += thisDispo.qty;
      }
    }
  };

  // ---- Tab Buttons /////////////////////////
  const tabButton = (reason, title) => {
    return (
      <button
        type="button"
        className={`secondary ${
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

  //----Didn't Want / Need Buttons ////////////////////////

  const handleDwnClick = (dwnKey) => {
    const draftLocStMI = cloneDeep(locStMI);
    //toggle the boolean value
    draftLocStMI.dwnDispos[dwnKey].selected =
      !draftLocStMI.dwnDispos[dwnKey].selected;
    setLocStMI(draftLocStMI);
  };

  // reusable button to set local Disposition to be edited.
  const uiDWNbutton = (dwnKey) => {
    const oThisDwn = locStMI.dwnDispos[dwnKey];
    const isSelected = oThisDwn.selected ? "active" : "";

    return (
      <button
        type="button"
        onClick={() => {
          handleDwnClick(dwnKey);
        }}
        key={dwnKey}
        className={`baseButton secondary ${isSelected}`}
      >
        {`${oThisDwn.title}`}
      </button>
    );
  };

  const dwnButtonsArr = Object.keys(locStMI.dwnDispos).map((dwnObj) => {
    return uiDWNbutton(dwnObj);
  });

  //----Damaged / Defective Inputs ////////////////////////

  // deal with changes to the input field

  const handleInputQty = ({ ddKey, event }) => {
    const rawIn = parseInt(event.target.value);
    // Input might be empty so if NaN, set it to 0.
    const inputQty = isNaN(rawIn) ? "" : rawIn;

    const draftLocStMI = cloneDeep(locStMI);

    draftLocStMI.ddDispos[ddKey] = inputQty;
    // calculate new totals for DD items and DWN items
    const outDDqty = totalDDqtys(draftLocStMI);
    draftLocStMI.ddQty = outDDqty;
    draftLocStMI.dwnQty = nItemQty - outDDqty;

    setLocStMI(draftLocStMI);
  };

  const uiDDInputField = (ddKey) => {
    const oThisDispo = locStMI.ddDispos[ddKey];

    return (
      <div className={`ddDispoBox`} key={ddKey}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
            value={oThisDispo.qty}
            max={nItemQty}
          />
        </MRVinput>
        <p className={`body__small color__primary__text`}>{oThisDispo.title}</p>
      </div>
    );
  };

  const aDDdispoFields = Object.keys(locStMI.ddDispos).map((ddKey) => {
    return uiDDInputField(ddKey);
  });

  //----Final Component ////////////////////////

  return (
    <section className={`multiItem30 container`}>
      <TitleBar title="Item Details" />
      <section className={`mainContent`}>
        {/* Item Description */}
        <section className={`itemDescription`}>
          <section className={`picAndQty`}>
            <img src={oActiveItem.img} alt="Product"></img>
            <div>
              <h5>Total Qty</h5>
              <h2>{nItemQty}</h2>
            </div>
          </section>
          <div className={"itemCodes"}>
            <h5>{`Item # ${oActiveItem.itemNum}`}</h5>
            <div style={{ width: "0.75rem" }} />
            <h5>{`Model # ${oActiveItem.modelNum}`}</h5>
          </div>
          <h4>{oActiveItem.description}</h4>
        </section>

        {/* Return Reason Section */}
        <section className={`mrv returnReason`}>
          <p>Why is customer returning this item?</p>
          <section className={`tabCtnr`}>
            {tabButton("dwn", "Didn't Want / Need")}
            {tabButton("dd", "Damaged / Defective")}
          </section>

          {locStMI.activeTab === "dwn" ? (
            <section className={`dwnDispoCtnr`}>
              {/* Didn't Want / Need */}
              {dwnButtonsArr}
            </section>
          ) : (
            <section className={`ddDisposCtnr`}>
              {/* Damaged / Defective */}
              {aDDdispoFields}
            </section>
          )}
        </section>
      </section>

      <FooterContainer></FooterContainer>
    </section>
  );
};

export default MultiItemDetails30;

/*

*/
