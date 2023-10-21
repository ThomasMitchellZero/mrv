import "../../mrv/mrv-styles/mrvAllStyles.css";
import "../Exchanges/Exchanges.css";

import { useImmer } from "use-immer";
import { defaultExchState } from "./_Resources/glossary/glossaryExch.js";

import { Outlet } from "react-router";

function Exchanges() {
  const [exchSession, setExchSession] = useImmer({
    ...defaultExchState,
  });

  return (
    <section className={`mrv exch_Top`}>
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
