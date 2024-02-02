import { useOutletContext } from "react-router-dom";

import { HeaderSTRX } from "../../_resources/components/HeaderSTRX";

function StartSTRX() {
  const exchCtx = useOutletContext();

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <HeaderSTRX></HeaderSTRX>
        <div className={``}>
          <button type="button" onClick={() => {}} className={`mrvBtn primary`}>
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
