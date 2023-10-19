import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useOutletContext } from "react-router";

function InputReason30({ locSt_ExchReason, setLocSt_ExchReason }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;

  /* ---- Shared Functions ---- */

  const handleApply = (event) => {
    event.preventDefault();

    const activeKey = locSt_ExchReason.activeKey;
    const pendingDispo = locSt_ExchReason.pendingDispo;

    if (pendingDispo) {
      setExchState((draft) => {
        draft.allSwapGroups[activeKey.swapGroupKey].swaps[
          activeKey.thisSwapkey
        ].returningItem.itemDispo = pendingDispo;
      });
      setLocSt_ExchReason((draft) => {
        // clear active key to trigger auto-check for empty dispos.
        draft.activeKey = null;
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
      <label key={reasonTxt} className={`radio`}>
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
        <p className={`body`}>{reasonTxt}</p>
      </label>
    );
  });

  return (
    <form
      onSubmit={handleApply}
      className={`mrvPanel__side color__surface__subdued `}
    >
      <ExchHeader
        hasProductName={false}
        headerTitle="Select A Reason"
        hasCluster={false}
      />
      <section className={`main_content alignLeft`}>{reasonRadioArr}</section>
      <section className={`footer_text`}>
        {locSt_ExchReason.show30warning ? (
          <p className={`tinyText warning`}>
            Select reason item is being exchanged
          </p>
        ) : null}
      </section>
      <section className={`footer_content`}>
        <div className={`buttonBox`}>
          <button type="submit" className={`mrvBtn primary fullWidth jumbo`}>
            Apply
          </button>
        </div>
      </section>
    </form>
  );
}

export { InputReason30 };

/*
  
  
*/
