import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { MoneyRow } from "../../_Resources/components/displayOutputs/MoneyRow";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { useOutletContext } from "react-router";

function ReplacementDiscount({ parLocSt_Replace, setParLocSt_Replace }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchDeliveries = exchCtx.exchSession.deliveryGroups;


  const handleApply = () => {};


  return (

      <section className={`discountCtnr`}>
        <div className={`divider horizontal`} />
        <MoneyRow
          title={`Replacement Items`}
          moneyVal={parLocSt_Replace.replacementSum}
        />
      </section>
      
  );
}

export { ReplacementDiscount };
