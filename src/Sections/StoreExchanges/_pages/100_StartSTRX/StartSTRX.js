import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";

import { useNavigate } from "react-router";
import { useNodeNavSTRX } from "../../_resources/hooks/STRXhooks";

function StartSTRX() {
  const navigate = useNavigate();
  const nodeNavSTRX = useNodeNavSTRX();

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
              nodeNavSTRX("returns");
            }}
            className={`mrvBtn primary`}
          >
            Add Items From Invoice
          </button>
        </div>
      </section>
    </section>
  );
}

export { StartSTRX };

/*



*/
