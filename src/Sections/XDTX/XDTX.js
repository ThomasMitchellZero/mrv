import "../../mrv/mrv-styles/mrvAllStyles.css";

import { baseStateXDTX } from "./_resources/classes/ClassConfigs_XDTX";

import { useImmer } from "use-immer";

import { Outlet } from "react-router";

function XDTX() {
  const [sessionMRV, setSessionMRV] = useImmer(baseStateXDTX());

  return (
    <section className={`mrv XDTX_top`}>
      <Outlet
        context={{
          sessionMRV,
          setSessionMRV,
        }}
      />
    </section>
  );
}

export { XDTX };

/*


*/
