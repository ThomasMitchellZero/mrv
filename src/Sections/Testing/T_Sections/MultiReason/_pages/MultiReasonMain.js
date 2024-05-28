import "./_MultiReason.css";
import { Outlet } from "react-router";
import { useContext } from "react";

import InvoContext from "../../../../../store/invo-context";

import { useEffect } from "react";

import {
  useSetSessionInvos,
  useSetSessionItems,
  populateDisposArr,
  returnAutoDeriver,
} from "../../../../../mrv/MRVhooks/MRVhooks";

import {
  DispoMainPageMRV,
  useDispoMainMethods,
} from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import { SetDispos30MRV } from "../../../../../mrv/mrv-components/pages/disposPage/SetDispos30MRV";

import {
  baseReturnState,
  returnAtom,
  moneyObj,
  baseLocState,
} from "../../../../../globalFunctions/globalJS_classes";
import { useImmer } from "use-immer";

import { TitleBarMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";

import { StartTest } from "./StartTest";
import { DispoItems70 } from "./DispoItems70_BYD";

function MultiReasonMain({ tMode = "T1" }) {
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

  const invosCtx = useContext(InvoContext);

  let startReturnState = baseReturnState({
    returnItems: testItemAtomsArr,
    sessionInvos: { 88883333: invosCtx[88883333] },
  });

  startReturnState = returnAutoDeriver(startReturnState);
  startReturnState.returnItemDispos = populateDisposArr({
    sessionSt: startReturnState,
  });
  startReturnState.locSt = baseLocState({
    rPanActiveUI1: "didntWant",
  });

  const [sessionMRV, setSessionMRV] = useImmer(startReturnState);

  const uiTitleBar = (
    <TitleBarMRV
      showProductName={false}
      headerTitle={`MultiReason Testing: ${tMode}`}
      sessionState={sessionMRV}
      setSessionState={setSessionMRV}
      hasCluster={false}
    />
  );

  const uiMainDispoPage = (
    <DispoMainPageMRV
      sessionState={sessionMRV}
      setSessionState={setSessionMRV}
      titleBar={uiTitleBar}
      cashTotal={null}
      panel30={
        <SetDispos30MRV
          sessionState={sessionMRV}
          setSessionState={setSessionMRV}
          tMode={tMode}
        />
      }
      panel70={
        <DispoItems70
          sessionState={sessionMRV}
          setSessionState={setSessionMRV}
        />
      }
    />
  );

  return (
    <section className={`mrv`}>
      <section className={`mrvPage testStyle`}>
        <section className={`mrvPanel__main `}>{uiMainDispoPage}</section>
      </section>
    </section>
  );
}

export { MultiReasonMain };
