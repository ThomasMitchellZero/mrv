import "./ReplacementCheck.css";

import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";
import { useImmer } from "use-immer";
import { useNodeNavSTRX } from "../../_resources/hooks/STRXhooks";

function ReplacementCheck() {
  const nodeNavSTRX = useNodeNavSTRX();

  const defaultState = { activePanel: "askCustomer" };

  const [locStReplCheck, setLocStReplCheck] = useImmer(defaultState);

  /* ---- SHARED FUNCTIONS ---- */

  const uiStates = {
    askCustomer: (
      <>
        <div className={``}></div>
        <div className={`hBox minFlex gap2rem`}>
          <button
            type="button"
            onClick={() => {
              nodeNavSTRX("returns");
            }}
            className={`mrvBtn maxFlex primary`}
          >
            Add Items From Invoice
          </button>
          <button
            type="button"
            onClick={() => {
              nodeNavSTRX("returns");
            }}
            className={`mrvBtn maxFlex primary`}
          >
            Add Items From Invoice
          </button>
        </div>
      </>
    ),
    banishCustomer: (
      <>
        <div className={`hBox minFlex gap2rem`}>
          <button
            type="button"
            onClick={() => {
              nodeNavSTRX("returns");
            }}
            className={`mrvBtn maxFlex primary`}
          >
            Add Items From Invoice
          </button>
        </div>
      </>
    ),
  };

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main replacementCheck`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Replacement Items With Customer"}
        ></TitleBarSTRX>
        <div className={`main_content gap2rem`}>
          {uiStates[locStReplCheck.activePanel]}
        </div>
      </section>
    </section>
  );
}

export { ReplacementCheck };

/*



*/
