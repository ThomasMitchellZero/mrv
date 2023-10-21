import classes from "./_ReplacementItems.css";

import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useOutletContext } from "react-router";

import { MdArrowForward, MdDeleteOutline } from "react-icons/md";

import { useImmer } from "use-immer";

function ReplaceSwapsCard({
  parLocSt_Replace,
  setParLocSt_Replace,
  exchItemNum,
  exchSwapGroupNum,
}) {
  const exchCtx = useOutletContext();
  const thisSwapGroupRt = exchCtx.exchSession.allSwapGroups[exchSwapGroupNum];

  //---- Shared Functions ----

  const handleCardClick = () => {};
  const handleRemoveMain = (target) => {};
  const handeRemoveLPP = (target) => {};

  //---- UI Elements----

  const rowClassVariants = {
    mainItem: {
      trash: (
        <button
          type="button"
          className={`mrvBtn ghost`}
          onClick={handleRemoveMain}
        >
          <MdDeleteOutline fontSize="1.5rem" />
        </button>
      ),
      arrowIcon: <MdArrowForward className={`exchArrowIcon`} />,
    },

  };

  const itemArray = [];

  const makeCardRow = () => {
    for (const [swapKey, swapValue] of Object.entries(thisSwapGroupRt.swaps)) {
      const returnItem = swapValue.returningItem;
      const replaceItem = swapValue.replacementItem;
      const keyStr = `${exchSwapGroupNum}${swapKey}`;

      console.log(swapKey);
      itemArray.push(
        <section key={keyStr} className={`cardRow `}>
          <ProductInfo itemObj={returnItem} />
          <div className={`exchArrow_col `}>
            {rowClassVariants[swapKey]?.arrowIcon}
          </div>
          <ProductInfo itemObj={replaceItem} />
        </section>
      );
    }
  };

  makeCardRow();

  return (
    <section className={`cardStyle `} onClick={handleCardClick}>
      {itemArray}
    </section>
  );
}

export { ReplaceSwapsCard };
