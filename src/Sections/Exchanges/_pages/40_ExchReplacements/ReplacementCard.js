import classes from "./_ReplacementItems.css";

import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useOutletContext } from "react-router";

import { MdArrowForward } from "react-icons/md";

import { useImmer } from "use-immer";

function ReplacementCard({
  parLocSt_Replace,
  setParLocSt_Replace,
  exchItemNum,
}) {
  const exchCtx = useOutletContext();
  const thisExchItem = exchCtx.exchSession.itemsInExchange[exchItemNum];
  const returnItem = thisExchItem.returningItem;
  const replaceItem = thisExchItem.replacementItem;

  //---- Shared Functions ----

  const handleCardClick = () => {};

  //---- UI Elements----

  const itemArray = [];

  const makeCardRow = () => {
    itemArray.push(
      <section className={`cardRow `}>
        <ProductInfo itemObj={returnItem} />
        <ProductInfo itemObj={replaceItem} />
      </section>
    );
  };

  makeCardRow();

  return (
    <section className={`cardStyle `} onClick={handleCardClick}>
      {itemArray}
    </section>
  );
}

export { ReplacementCard };
