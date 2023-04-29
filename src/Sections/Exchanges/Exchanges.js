import "../../mrv/mrv-styles/mrvAllStyles.css";
import "../Exchanges/Exchanges.css";

import { useImmer } from "use-immer";
import { defaultExchState } from "./_Resources/glossary/glossaryExch";

import { Outlet } from "react-router";



function Exchanges() {
  const [exchSession, setExchSession] = useImmer({
    ...defaultExchState,

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

  const testTable = (
    <section className={`testContainerTest`}>
      <table>
        <thead>
          <tr>
            <th>This is just a test</th>
          </tr>
        </thead>
        <tbody>{testData}</tbody>
      </table>
    </section>
  );


*/
