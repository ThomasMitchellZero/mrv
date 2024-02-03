import { HeaderSTRX } from "../../_resources/components/HeaderSTRX";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { useNavigate } from "react-router";

function AllEntry30({ parLocState, setParLocState }) {
  const navigate = useNavigate();

  const s30Mode = parLocState.activeMode;

  // mode-specific properties
  const oMode = {
    receipt: {
      sLabel: "receipt",
      sPanelTitle: "Scan / Enter Receipts",
      sInputLabel: "",
    },
    item: {
      sLabel: "item",
      sPanelTitle: "Scan / Enter Items",
      sInputLabel: "",
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
      <section className={`main_content gap2rem`}>
        <div className={`tabBox`}>
          {uiTabBtn("receipt")}
          {uiTabBtn("item")}
        </div>
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
