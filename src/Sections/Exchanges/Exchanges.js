import "../../mrv-styles/mrvAllStyles.css";

import { useImmer } from "use-immer";

import { Outlet } from "react-router";

function Exchanges() {
  const [exchSession, setExchSession] = useImmer({});


  return (
    <section className={`mrv mrv-primary-grid`}>
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
