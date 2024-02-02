import "../../mrv/mrv-styles/mrvAllStyles.css";
import "../Exchanges/Exchanges.css";

import { useImmer } from "use-immer";


import { Outlet } from "react-router";

const defaultState = {

}

function StoreExchanges() {
  const [sessionSTRX, setSessionStrx] = useImmer({
    ...defaultState,
  });

  return (
    <section className={`mrv exch_Top`}>
      <Outlet
        context={{
            sessionSTRX: sessionSTRX,
            setSessionStrx: setSessionStrx,
        }}
      />
    </section>
  );
}

export default StoreExchanges;

/*


*/
