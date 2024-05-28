import { useNavigate } from "react-router";
import "./TestIndex.css";

import { Outlet } from "react-router";

function TestIndex() {
  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  const navigate = useNavigate();

  return (
    <section className={`mrv`}>
      <section className={`mrvPage testIndex`}>
        <section className={`mrvPanel__main`}>
          <div className={`main_content gap2rem `}>
            <div className={`vBox alignLeft maxWidth`}>
              <p className={`heading__small`}>Multi Reason Input</p>
              <div className={`hBox alignLeft`}>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/mrv/test/multi-reason-t1");
                  }}
                  className={`mrvBtn primary`}
                >
                  Multi-Reason T1
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/mrv/test/multi-reason-t2");
                  }}
                  className={`mrvBtn primary`}
                >
                  Multi-Reason T2
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export { TestIndex };

/*



*/
