import { DispoMainPageMRV } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import { baseReturnState } from "../../../../../globalFunctions/globalJS_classes";
import { useImmer } from "use-immer";

import { TitleBarMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";

import { StartTest } from "./StartTest";

const MultiReasonMain = ({ tMode = "T1" }) => {
  const defaultTestMRState = baseReturnState({});

  const [sessionTestMR, setsessionTestMR] = useImmer(defaultTestMRState);

  const uiTitleBar = (
    <TitleBarMRV
      hasIcon={false}
      showProductName={false}
      headerTitle={`MultiReason Testing: ${tMode}`}
      sessionState={sessionTestMR}
      setSessionState={setsessionTestMR}
      hasCluster={false}
    />
  );

  const uiMainDispoPage = (
    <DispoMainPageMRV
      sessionState={sessionTestMR}
      setSessionState={setsessionTestMR}
    />
  );

  const uiDisplay = sessionTestMR.returnItems.length ? (
    uiMainDispoPage
  ) : (
    <StartTest
      sessionState={sessionTestMR}
      setSessionState={setsessionTestMR}
    />
  );

  return (
    <section className={`mrv`}>
      <section className={`mrvPage testStyle`}>
        <section className={`mrvPanel__main `}>{uiDisplay}</section>
      </section>
    </section>
  );
};

export { MultiReasonMain };
