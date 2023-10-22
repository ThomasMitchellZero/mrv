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
  const handleRemoveLPP = (target) => {};

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
    lpp_3yr: {
      trash: (
        <button
          type="button"
          className={`mrvBtn ghost`}
          onClick={handleRemoveLPP}
        >
          <MdDeleteOutline fontSize="1.5rem" />
        </button>
      ),
    },
    accessory: {},
  };
  // 3 and 5 year display the same.
  rowClassVariants.lpp_5yr = rowClassVariants.lpp_3yr;

  const itemArray = [];

  const makeCardRow = () => {
    for (const [swapKey, swapValue] of Object.entries(thisSwapGroupRt.swaps)) {
      const returnItem = swapValue.returningItem;
      const replaceItem = swapValue.replacementItem;
      const keyStr = `${exchSwapGroupNum}${swapKey}`;

      itemArray.push(
        <section key={keyStr} className={`cardRow `}>
          <div className={`prodinfo_col`}>
            <ProductInfo itemObj={returnItem} />
          </div>
          <div className={`exchArrow_col `}>
            {rowClassVariants[swapKey]?.arrowIcon}
          </div>
          <div className={`prodinfo_col`}>
            <ProductInfo itemObj={replaceItem} />
          </div>
          <div className={`exchTrash_col `}>
            {rowClassVariants[swapKey]?.trash}
          </div>
          <div className={`divider vertical `} />
          <div className={`money_col`}>
            <p className={`body__large `}>{`$0.00`}</p>
          </div>
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
