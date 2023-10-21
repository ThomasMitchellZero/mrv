import classes from "./_ReplacementItems.css";

import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useOutletContext } from "react-router";

import { MdArrowForward } from "react-icons/md";

import { useImmer } from "use-immer";

function ReplaceSwapsCard({
  parLocSt_Replace,
  setParLocSt_Replace,
  exchItemNum,
  exchSwapGroupNum,
}) {
  const exchCtx = useOutletContext();
  const thisExchItem = exchCtx.exchSession.itemsInExchange;
  const thisSwapGroupRt = exchCtx.exchSession.allSwapGroups[exchSwapGroupNum];

  //---- Shared Functions ----

  const handleCardClick = () => {};

  //---- UI Elements----

  const itemArray = [];

  const makeCardRow = () => {
    for (const [swapKey, swapValue] of Object.entries(thisSwapGroupRt.swaps)) {
      const returnItem = swapValue.returningItem;
      const replaceItem = swapValue.replacementItem;
      const keyStr = `${exchSwapGroupNum}${swapKey}`;

      itemArray.push(
        <section key={keyStr} className={`cardRow `}>
          <ProductInfo itemObj={returnItem} />
          <div className={`exchArrow_col `}>
            <MdArrowForward
              fontSize="2.5rem"
              className={`color__green__text`}
            />
          </div>
          <ProductInfo itemObj={replaceItem} />
        </section>
      );
    }
  };

  const populateTable = (targetObjRt) => {
    const thisReturnItem = targetObjRt.returningItem;
    const thisReplaceItem = targetObjRt.replacementItem;
  };

  makeCardRow();

  return (
    <section className={`cardStyle `} onClick={handleCardClick}>
      {itemArray}
    </section>
  );
}

export { ReplaceSwapsCard };
