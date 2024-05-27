import { DispoMainPageMRV, DispoMainMRVLocSt } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import {
  useSetSessionInvos,
  useSetSessionItems,
  populateDisposArr
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




  /*
  const setSessionItems = useSetSessionItems({ sessionState, setSessionState });
  const setSessionInvos = useSetSessionInvos({ sessionState, setSessionState });

    const handleClick = () => {
    setSessionInvos({ invoNum: "88883333", actionType: "add" });
    setSessionState((draft) => {
      draft.returnItemDispos = populateDisposArr({sessionSt: sessionState});
    });
    setSessionState((draft) => {
      draft.trell ="trell"
      draft.locSt = DispoMainMRVLocSt({ sessionState: sessionState, setSessionState });
     });
  };
  
  */


  return (
    <div className={`startBtnBox main_content gap2rem`}>
      <button type="button" className={`mrvBtn primary`} onClick={()=>{}}>
        Start Scenario
      </button>
    </div>
  );
};

export { StartTest };
