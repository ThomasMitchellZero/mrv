import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext, useNavigate } from "react-router";

import cloneDeep from "lodash.clonedeep";
import { current } from "immer";

function InputReason30({
  nextActiveFunc,
  locSt_ExchReason,
  setLocSt_ExchReason,
}) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;

  /* ---- Shared Functions ---- */

  const handleApply = () => {
    const activeKey = locSt_ExchReason.activeKey;
    const pendingDispo = locSt_ExchReason.pendingDispo;

    if (pendingDispo) {
      setExchState((draft) => {
        draft.exchProducts.get(activeKey).itemDispo = pendingDispo;
        const outItems = current(draft.exchProducts);

        setLocSt_ExchReason(() => {
          const outObj = nextActiveFunc(outItems);
          return outObj;
        });
      });
    } else {
      setLocSt_ExchReason((draft) => {
        draft.show30warning = true;
      });
    }
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
          checked={locSt_ExchReason.pendingDispo === reasonTxt}
          onChange={() =>
            setLocSt_ExchReason((draft) => {
              draft.pendingDispo = reasonTxt;
              draft.show30warning = false;
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
      <section className={`footer_text`}>
        {locSt_ExchReason.show30warning ? (
          <p className={`tinyText warning`}>
            Select reason item is being exchanged
          </p>
        ) : null}
      </section>
      <section className={`footer_content`}>
        <button
          type="button"
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
