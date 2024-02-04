import { HeaderSTRX } from "../../_resources/components/HeaderSTRX";
import { ItemEntry, ReceiptEntry } from "./EntrySubsections";

import { useNavigate } from "react-router";

function AllEntry30({ parLocState, setParLocState }) {
  const navigate = useNavigate();

  const s30Mode = parLocState.activeMode;

  // mode-specific properties
  const oMode = {
    receipt: {
      sLabel: "receipt",
      sPanelTitle: "Add Receipts",
      sInputLabel: "",
      inputCluster: <ReceiptEntry parentLocSt={parLocState} setParentLocSt={setParLocState} />
    },

    item: {
      sLabel: "item",
      sPanelTitle: "Add Items",
      sInputLabel: "",
      inputCluster: <ItemEntry parentLocSt={parLocState} setParentLocSt={setParLocState} />
    },
  };

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- UI ELEMENTS ---- */

  // Tab Buttons
  const uiTabBtn = (btnType) => {
    const isActive = s30Mode === btnType ? "active" : "";

    const handleTabClick = () => {
      setParLocState((draft) => {
        draft.activeMode = btnType;
      });
    };
    return (
      <button onClick={handleTabClick} className={`tab fullWidth ${isActive}`}>
        {`${oMode[btnType].sLabel}s`}
      </button>
    );
  };


  /* ########  OUTPUT JSX   ######## */

  return (
    <main className={`allEntry30 mrvPanel__side color__surface__default`}>
      <HeaderSTRX
        hasCluster={false}
        showProductName={false}
        headerTitle={oMode[s30Mode].sPanelTitle}
      />
      <section className={`main_content`}>
        <div className={`tabBox`}>
          {uiTabBtn("receipt")}
          {uiTabBtn("item")}
        </div>
        {/* Input cluster varies based on selected Mode */}
        {oMode[s30Mode].inputCluster}
      </section>
      <section className={`footer_content`}>
        <div className={`buttonBox`}>
          <button type="submit" className={`mrvBtn primary fullWidth jumbo`}>
            Apply
          </button>
        </div>
      </section>
    </main>
  );
}

export { AllEntry30 };

/*



*/
