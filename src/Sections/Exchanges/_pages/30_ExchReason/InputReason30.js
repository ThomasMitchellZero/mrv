import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext, useNavigate } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function InputReason30({ activeItemNum }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const activeProduct = exchCtx.exchSession.exchProducts.get(activeItemNum);

  console.log(activeProduct);

  const defaultState = { reason: activeProduct.exchReason };
  //local state
  const [locSt_Reason30, setLocSt_Reason30] = useImmer(defaultState);

  console.log(locSt_Reason30.reason);

  /* ---- Shared Functions ---- */

  /* ---- UI Elements ---- */

  const radioReasons = [
    { txt: "Doesn't Work" },
    { txt: "Missing Parts" },
    { txt: "Broken" },
    { txt: "Cosmetic" },
    { txt: "Out Of Package" },
    { txt: "Used" },
    { txt: "Warranty" },
  ];

  const reasonRadioArr = radioReasons.map((reasonObj) => {
    const reasonTxt = reasonObj.txt;
    return (
      <label key={reasonTxt}>
        <input
          type="radio"
          checked={locSt_Reason30.reason === reasonTxt}
          onChange={() =>
            setLocSt_Reason30((draft) => {
              draft.reason = reasonTxt;
            })
          }
        />
        {reasonTxt}
      </label>
    );
  });

  return (
    <section className={`mrvPanel__side exch-rows`}>
      <ExchHeader
        hasProductName={false}
        headerTitle="Select A Reason"
        hasCluster={false}
      />
      <section className={`main_content main_col alignLeft`}>
        {reasonRadioArr}
      </section>
    </section>
  );
}

export { InputReason30 };

/*
  
  
*/
