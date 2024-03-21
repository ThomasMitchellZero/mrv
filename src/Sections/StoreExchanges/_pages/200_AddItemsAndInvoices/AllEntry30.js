import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { ItemEntry, ReceiptEntry } from "./EntrySubsections";


function AllEntry30({ parLocState, setParLocState }) {


  const s30Mode = parLocState.activeMode;

  // mode-specific properties
  const oMode = {
    receipt: {
      sLabel: "receipt",
      sInputLabel: "",
      inputCluster: <ReceiptEntry parentLocSt={parLocState} setParentLocSt={setParLocState} />
    },

    item: {
      sLabel: "item",
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
      <TitleBarSTRX
        hasCluster={false}
        showProductName={false}
        headerTitle={"Add To Exchange"}
      />
      <section className={`main_content`}>
        <div className={`tabBox`}>
          {uiTabBtn("receipt")}
          {uiTabBtn("item")}
        </div>
        {/* Input cluster varies based on selected Mode */}
        {oMode[s30Mode].inputCluster}
      </section>
    </main>
  );
}

export { AllEntry30 };

/*



*/
