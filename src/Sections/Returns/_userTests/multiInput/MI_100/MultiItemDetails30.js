import classes from "./MultiItemDetails30.css";

import TitleBar from "../../../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../../../components/UI/PageLayout/FooterContainer";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";

import { useOutletContext } from "react-router";

import cloneDeep from "lodash.clonedeep";

import { useReducer, useRef, useState } from "react";

import { useNavigate } from "react-router";

// Reducer to control which tab and which defective reason are active.

const MultiItemDetails30 = ({ rtrnIndexContext }) => {
  const returnsCtx = useOutletContext();
  const dispatchRtrn = returnsCtx.dispatchSession;
  const sActiveItemNum = rtrnIndexContext.activeItem;
  const oActiveItem = returnsCtx.session.items[sActiveItemNum];
  const nItemQty = oActiveItem.quantity;
  const navigate = useNavigate();

  const defaultState = {
    activeTab: "dwn",
    isValid: true,
    dwnQty: nItemQty,
    ddQty: 0,
    dwnDispos: {
      tooHeavy: { selected: false, title: "Too Heavy" },
      wrongSize: { selected: false, title: "Wrong Size" },
      wrongColor: { selected: false, title: "Wrong Color" },
      betterPrice: { selected: false, title: "Found Better Price" },
    },

    ddDispos: {
      noWorky: { qty: "", title: "Doesn't Work" },
      missingParts: { qty: "", title: "Missing Parts" },
      broken: { qty: "", title: "Broken" },
      cosmetic: { qty: "", title: "Cosmetic" },
      crackedBowl: { qty: "", title: "Cracked Bowl" },
      crackedTank: { qty: "", title: "Cracked Tank" },
      leaking: { qty: "", title: "Leaking" },
    },
  };

  //Shared Functions

  const [locStMI, setLocStMI] = useState(defaultState);

  // ---- Tab Buttons /////////////////////////
  const tabButton = (reason, title) => {
    const qtyField = reason === "dwn" ? locStMI.dwnQty : locStMI.ddQty;

    return (
      <button
        type="button"
        className={`tab body__small ${
          locStMI.activeTab === reason ? "active" : ""
        }`}
        onClick={() => {
          const draftLocStMI = cloneDeep(locStMI);
          draftLocStMI.activeTab = reason;
          setLocStMI(draftLocStMI);
        }}
      >
        <p className={`body__large`}>{qtyField}</p>
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
    const isSelected = oThisDwn.selected ? "selected" : "";

    return (
      <button
        type="button"
        onClick={() => {
          handleDwnClick(dwnKey);
        }}
        key={dwnKey}
        className={`chip ${isSelected}`}
      >
        {`${oThisDwn.title}`}
      </button>
    );
  };

  const dwnButtonsArr = Object.keys(locStMI.dwnDispos).map((dwnObj) => {
    return uiDWNbutton(dwnObj);
  });

  //----Damaged / Defective Inputs ////////////////////////

  const totalDDqtys = (draftLocSt) => {
    // produces sum of all Damaged dispos.
    let outTotalQty = 0;
    for (const thisDispo of Object.values(draftLocSt.ddDispos)) {
      const thisQty = thisDispo.qty;
      if (typeof thisDispo.qty === "number") {
        outTotalQty += thisQty;
      }
    }
    return outTotalQty;
  };

  // deal with changes to the input field
  const handleInputQty = ({ ddKey, event }) => {
    const inputQty = parseInt(event.target.value) || "";
    // Input might be empty so if NaN, set it to 0.

    const draftLocStMI = cloneDeep(locStMI);

    draftLocStMI.ddDispos[ddKey].qty = inputQty;
    // calculate new totals for DD items and DWN items
    const outDDqty = totalDDqtys(draftLocStMI);
    const outDWNqty = nItemQty - outDDqty;
    draftLocStMI.ddQty = outDDqty;
    draftLocStMI.dwnQty = outDWNqty;
    draftLocStMI.isValid = outDWNqty >= 0;

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
            onChange={(event) => {
              handleInputQty({ ddKey: ddKey, event: event });
            }}
          />
        </MRVinput>
        <p className={`body__small color__primary__text`}>{oThisDispo.title}</p>
      </div>
    );
  };

  const aDDdispoFields = Object.keys(locStMI.ddDispos).map((ddKey) => {
    return uiDDInputField(ddKey);
  });

  const uiWarningtext = locStMI.isValid
    ? ""
    : `Total Damaged / Defective qty exceeds item qty by ${Math.abs(
        locStMI.dwnQty
      )}`;

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
          <p className="body">Why is customer returning this item?</p>
          <section className={`tabCtnr`}>
            {tabButton("dwn", "Didn't Want / Need")}
            {tabButton("dd", "Damaged / Defective")}
          </section>

          {locStMI.activeTab === "dwn" ? (
            <section className={`dwnDispoCtnr`}>
              <p className={`tinyText reasonExplainer`}>
                Select all reasons customer doesn't want items
              </p>
              {/* Didn't Want / Need */}
              {dwnButtonsArr}
            </section>
          ) : (
            <section className={`ddDisposCtnr`}>
              <p className={`tinyText reasonExplainer`}>
                Enter types and qtys of any damaged items
              </p>
              {/* Damaged / Defective */}
              {aDDdispoFields}
            </section>
          )}
        </section>
      </section>

      <section className={`mrv foota`}>
        <section className={`footer_text`}>
          <p className={`tinyText warning`}>{uiWarningtext}</p>
        </section>

        <section className={`buttonBox`}>
          <button
            onClick={() => {navigate("/mrv/returns/test-complete")}}
            className={`mrvBtn primary fullWidth `}
          >
            Continue
          </button>
        </section>
      </section>
    </section>
  );
};

export default MultiItemDetails30;

/*

*/
