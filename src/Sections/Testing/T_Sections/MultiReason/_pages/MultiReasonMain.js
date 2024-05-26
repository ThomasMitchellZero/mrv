import "./_MultiReason.css";

import { DispoMainPageMRV } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import {
  baseReturnState,
  returnAtom,
  moneyObj,
} from "../../../../../globalFunctions/globalJS_classes";
import { useImmer } from "use-immer";

import { TitleBarMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";

import { StartTest } from "./StartTest";
import { DispoItems70 } from "./DispoItems70_BYD";

const MultiReasonMain = ({ tMode = "T1" }) => {
  const testItemAtomsArr = [
    new returnAtom({
      atomItemNum: "330",
      atomItemQty: 2,
      atomMoneyObj: new moneyObj({
        unitBaseValue: 2250,
      }),
    }),
    new returnAtom({
      atomItemNum: "440",
      atomItemQty: 2,
      atomMoneyObj: new moneyObj({
        unitBaseValue: 15599,
      }),
    }),
    new returnAtom({
      atomItemNum: "550",
      atomItemQty: 4,
      atomMoneyObj: new moneyObj({
        unitBaseValue: 1299,
      }),
    }),
    new returnAtom({
      atomItemNum: "660",
      atomItemQty: 7,
      atomMoneyObj: new moneyObj({
        unitBaseValue: 2250,
      }),
    }),
  ];

  const defaultTestMRState = baseReturnState({ returnItems: testItemAtomsArr });

  const [sessionTestMR, setsessionTestMR] = useImmer(defaultTestMRState);

  const uiTitleBar = (
    <TitleBarMRV
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
      titleBar={uiTitleBar}
      cashTotal={null}
      panel70={<DispoItems70 parLocState={sessionTestMR} />}
    />
  );

  const uiDisplay = Object.keys(sessionTestMR.sessionInvos).length ? (
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
