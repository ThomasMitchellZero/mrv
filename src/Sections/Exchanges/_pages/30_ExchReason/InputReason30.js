import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext, useNavigate } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function InputReason30({}) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProducts = exchCtx.exchSession.exchProducts;


  const defaultState = {};
    //local state
    const [locSt_Reason30, setLocSt_Reason30] = useImmer(defaultState);

  /* ---- Shared Functions ---- */




  return (
      <section className={`mrvPanel__side exch-rows`}>
        <ExchHeader
          headerTitle="Select A Reason"
          hasCluster={false}
        />
        <section className={`main_content main_col`}>
        </section>
      </section>
 

  );
}

export { InputReason30 };

/*
  
  
*/
