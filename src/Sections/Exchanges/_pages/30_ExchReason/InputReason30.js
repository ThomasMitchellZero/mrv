import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";


import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext, useNavigate } from "react-router";

import cloneDeep from "lodash.clonedeep";
import { current } from "immer";

function InputReason30({
  activeItemNum,
  pendingDispo,
  nextActiveFunc,
  setLocSt_ExchReason,
}) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  //const setParent = setLocSt_ExchReason

  /* ---- Shared Functions ---- */

  const handleApply = () => {
    setExchState((draft) => {
      draft.exchProducts.get(activeItemNum).itemDispo = pendingDispo;
      const outItems = current(draft.exchProducts)
      console.log(nextActiveFunc(outItems))
    });
  };

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
          checked={pendingDispo === reasonTxt}
          onChange={() =>
            setLocSt_ExchReason((draft) => {
              draft.pendingDispo = reasonTxt;
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
      <section className={`footer_content`}>
        <button
          className={`mrvBtn primary fullWidth jumbo`}
          onClick={handleApply}
        >
          Apply
        </button>
      </section>
    </section>
  );
}

export { InputReason30 };

/*
  
  
*/
