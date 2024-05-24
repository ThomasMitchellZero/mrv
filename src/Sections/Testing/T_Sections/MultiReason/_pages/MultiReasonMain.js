import { DispoMainPageMRV } from "../../../../../mrv/mrv-components/pages/disposPage/DispoMainPageMRV";

import { baseReturnState } from "../../../../../globalFunctions/globalJS_classes";
import { useImmer } from "use-immer";

import { TitleBarMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";

const MultiReasonMain = ({ tMode = "T1" }) => {

    const defaultTestMRState = baseReturnState({});
    
  const [sessionTestMR, setsessionTestMR] = useImmer();

  const uiTitleBar = (
    <TitleBarMRV
      hasIcon={false}
      showProductName={false}
      headerTitle={`MultiReason Testing: ${tMode}`}
    />
  );

  return <DispoMainPageMRV titleBar={uiTitleBar} />;
};

export { MultiReasonMain };
