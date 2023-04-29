import "../../mrv/mrv-styles/mrvAllStyles.css";
import "../Exchanges/Exchanges.css";

import { useImmer } from "use-immer";
import { defaultExchState } from "./_Resources/glossary/glossaryExch";

import { Outlet } from "react-router";

let testData = [];

for (let i = 0; i < 33; i++) {
  testData.push(
    <tr>
      <td>{i}</td>
    </tr>
  );
}

function Exchanges() {
  const [exchSession, setExchSession] = useImmer({
    ...defaultExchState,
    test: testData,
  });

  const testTable = (
    <table>
      <thead>
        <tr>
          <th>This is just a test</th>
        </tr>
      </thead>
      <tbody>{testData}</tbody>
    </table>
  );

  return (
    <section className={`mrv-top`}>
      <section className={`SecondLeveltest`}>
        <section className={`testContainerTest`}>{testTable}</section>
      </section>
    </section>
  );
}

export default Exchanges;

/*

    <section className={`mrv-top`}>
      <Outlet
        context={{
          exchSession: exchSession,
          setExchSession: setExchSession,
        }}
      />
    </section>

*/
