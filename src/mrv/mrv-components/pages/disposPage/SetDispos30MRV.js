import "./_Dispositions.css";

import {
  SingleDispo,
  ItemDisposObj,
  baseReturnState,
} from "../../../../globalFunctions/globalJS_classes";

import { useImmer, useImmerReducer } from "use-immer";
import { cloneDeep } from "lodash";
import { useOutletContext } from "react-router";

import { TitleBarMRV } from "../../DisplayOutputs/TitleBarMRV";
import { MRVinput } from "../../inputs/MRVinput";

function SetDispos30MRV({
  parLocStDispos = {},
  setParLocStDispos = () => console.log("No Local State Setter Provided"),
}) {
  const strxCtx = useOutletContext();
  const sessionSTRX = strxCtx.sessionSTRX;
  const setSessionStrx = strxCtx.setSessionStrx;

  const clearableFields = {
    activeSingleDispo: "",
    activeDisposObj: {},
    activeErrorState: "",
  };

  const initLocStDispoMain = {
    activeRowKey: {},
    ...clearableFields,
  };

  const refSingleDispo = new SingleDispo({});

  const ddDispos = {
    noWorky: new SingleDispo({dispoQty: 0, keyStr: "noWorky", isResellable: false}), //{ qty: "", title: "Doesn't Work" },
    missingParts: { qty: "", title: "Missing Parts" },
    broken: { qty: "", title: "Broken" },
    cosmetic: { qty: "", title: "Cosmetic" },
    scratchDent: { qty: "", title: "Scratched / Dented" },
  };

  // deal with changes to the input field
  const handleInputQty = ({ ddKey, event }) => {
    const inputQty = parseInt(event.target.value) || "";
    // Input might be empty so if NaN, set it to 0.

    const draftLocStMI = cloneDeep(parLocStDispos);
  };

  const uiDDInputField = (ddKey) => {
    const oThisDispo = parLocStDispos.ddDispos[ddKey];

    return (
      <div className={`ddDispoBox`} key={ddKey}>
        <MRVinput width={"5rem"}>
          <input
            type="number"
            min="0"
            step="1"
            value={oThisDispo.qty}
            onChange={(event) => {
              handleInputQty({ ddKey: ddKey, event: event });
            }}
          />
        </MRVinput>
        <p className={`body__small color__primary__text`}>{oThisDispo.title}</p>
      </div>
    );
  };

  const aDDdispoFields = Object.keys([]).map((ddKey) => {
    return uiDDInputField(ddKey);
  });

  return (
    <section className={`mrvPanel__side color__surface__default`}>
      <TitleBarMRV headerTitle={`Return Reason`} hasCluster={false} />
      <div className={`main_content`}>
        <div className={`heading__medium`}>30 Panel</div>
      </div>
      <div className={`footer_content`}></div>
    </section>
  );
}

export { SetDispos30MRV };
