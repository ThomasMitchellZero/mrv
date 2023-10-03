import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
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

  const locReplacementSum = parLocSt_Replace.replacementSum;
  const locDiscount = parLocSt_Replace.discount;
  const locDiscountPct = parLocSt_Replace.discountPct;
  const locdiscountedTotal = parLocSt_Replace.discountedTotal;

  const handleDiscountInput = (event) => {
    let input = parseInt(event.target.value);

    setParLocSt_Replace((draft) => {
      draft.discount = input;
    });
  };

  const handlePctInput = (event) => {
    let input = parseInt(event.target.value);

    setParLocSt_Replace((draft) => {
      draft.discountPct = input;
    });
  };

  return (
    <section className={`discountCtnr`}>
      <div className={`divider horizontal`} />

      <section className={`inputsCtnr`}>
        <MRVinput>
          <input
            type="number"
            min="0"
            step="1"
            value={locDiscountPct}
            onChange={handlePctInput}
          />
        </MRVinput>
        <MRVinput>
          <input
            type="number"
            min="0"
            step="1"
            value={locDiscount}
            onChange={handleDiscountInput}
          />
        </MRVinput>
      </section>
      <MoneyRow
        title={`Replacement Items`}
        moneyVal={parLocSt_Replace.replacementSum}
      />
    </section>
  );
}

export { ReplacementDiscount };
