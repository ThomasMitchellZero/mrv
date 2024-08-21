import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";

import { useNavigate } from "react-router";
import { useNodeNavSTRX } from "../../_resources/hooks/STRXhooks";
import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";


function StartSTRX() {
  const nodeNav = useNodeNav();

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarSTRX showNavNodeBar={true} headerTitle={"Choose Scenario"}></TitleBarSTRX>
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

export { StartSTRX };

/*



*/
