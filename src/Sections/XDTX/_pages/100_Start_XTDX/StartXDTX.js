import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";

import { useNodeNav, useSetSessionInvos } from "../../../../mrv/MRVhooks/MRVhooks";

function StartXDTX() {
  const nodeNav = useNodeNav();
  const setSessionInvos = useSetSessionInvos();

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  const handleClickSc1 = () => {
    setSessionInvos({ invos: [] });

    nodeNav("choose-items");
  }


  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarMRV
          showNavNodeBar={true}
          headerTitle={"Choose Scenario"}
        ></TitleBarMRV>
        <div className={`main_content gap2rem alignLeft`}>
          <button
            type="button"
            onClick={() => {
              nodeNav("replacementCheck");
            }}
            className={`mrvBtn primary`}
          >
            Test Scenario 1
          </button>
        </div>
      </section>
    </section>
  );
}

export { StartXDTX };

/*



*/
