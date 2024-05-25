import { DispoMainPageMRV } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import { baseReturnState } from "../../../../../globalFunctions/globalJS_classes";

const StartTest = ({
  sessionState = baseReturnState({}),
  setSessionState = () => console.log("No Session State Setter Provided"),
}) => {
  const handleClick = () => {
    console.log("Start Scenario");
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
