import { DispoMainPageMRV } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import {
  useSetSessionInvos,
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";

import {
  baseReturnState,
  returnAtom,
  moneyObj,
} from "../../../../../globalFunctions/globalJS_classes";

const StartTest = ({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
}) => {
  const setSessionItems = useSetSessionItems({ sessionState, setSessionState });
  const setSessionInvos = useSetSessionInvos({ sessionState, setSessionState });

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

  const handleClick = () => {
    setSessionInvos({ invoNum: "88883333", actionType: "add" });
  };

  return (
    <div className={`startBtnBox main_content gap2rem`}>
      <button type="button" className={`mrvBtn primary`} onClick={handleClick}>
        Start Scenario
      </button>
    </div>
  );
};

export { StartTest };
