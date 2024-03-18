import { TitleBarSTRX } from "../../_resources/components/TitleBarSTRX";

import { useNavigate } from "react-router";

function StartSTRX() {
  const navigate = useNavigate();

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarSTRX headerTitle={"Choose Scenario"}></TitleBarSTRX>
        <div className={`main_content gap2rem alignLeft`}>
          <button
            type="button"
            onClick={() => {
              navigate("/mrv/store-exchanges/choose-items-invos");
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
