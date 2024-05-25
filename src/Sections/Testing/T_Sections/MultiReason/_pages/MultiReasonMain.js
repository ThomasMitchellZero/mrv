import { DispoMainPageMRV } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import {
  baseReturnState,
  returnAtom,
  moneyObj,
} from "../../../../../globalFunctions/globalJS_classes";
import { useImmer } from "use-immer";

import { TitleBarMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { DispoItemCard } from "../../../../../mrv/mrv-components/pages/disposPage/DispoItemCard";

import { StartTest } from "./StartTest";

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
      itemRow={<DispoItemCard />}
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
