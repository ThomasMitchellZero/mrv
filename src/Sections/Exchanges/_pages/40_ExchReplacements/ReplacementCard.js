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
  const itemsInExch = exchCtx.exchSession.itemsInExchange;

  //---- Shared Functions ----

  const handleCardClick = () => {};

  //---- UI Elements----

  const itemArray = [];

  return (
    <section className={`cardStyle `} onClick={handleCardClick}>
      {exchItemNum}
    </section>
  );
}

export { ReplacementCard };
