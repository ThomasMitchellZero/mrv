import "../../mrv-styles/mrvAllStyles.css";

import { useImmer } from "use-immer";

import { Outlet } from "react-router";

function Exchanges() {
  const [exchSession, setExchSession] = useImmer({
    activePanels:{
        left: null,
        main: null,
        right: null,
    }
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
