import "../../mrv/mrv-styles/mrvAllStyles.css";
import "./StoreExchanges.css";


import { baseStateSTRX } from "../../Sections/StoreExchanges/_resources/hooks/STRXhooks";


import { useImmer } from "use-immer";

import { Outlet } from "react-router";

function StoreExchanges() {

  const [sessionMRV, setSessionMRV] = useImmer(
    baseStateSTRX()
  );

  return (
    <section className={`mrv STRX_top`}>
      <Outlet
        context={{
          sessionMRV,
          setSessionMRV,
        }}
      />
    </section>
  );
}

export { StoreExchanges };

/*


*/
