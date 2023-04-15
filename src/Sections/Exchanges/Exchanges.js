import "../../mrv/mrv-styles/mrvAllStyles.css";
import "../Exchanges/_Resources/EXCH_styles/exchAllStyles.css";

import { useImmer, useImmerReducer } from "use-immer";
import {
  nav_SelectItems,
  defaultExchState,
} from "./_Resources/glossary/glossaryExch";

import { Outlet } from "react-router";

function Exchanges() {
  const [exchSession, setExchSession] = useImmer({
    ...defaultExchState,
    activeOrder: "FART",
  });

  return (
    <section className={`mrv-top`}>
      <Outlet
        context={{
          exchSession: exchSession,
          setExchSession: setExchSession,
        }}
      />
    </section>
  );
}

export default Exchanges;

/*

*/
