import {
  useDollarsToCents,
  useCentsToDollars,
} from "../../_Resources/customHooks/exchHooks";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { MoneyRow } from "../../_Resources/components/displayOutputs/MoneyRow";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { useOutletContext } from "react-router";

function ReplacementDiscount({ parLocSt_Replace, setParLocSt_Replace }) {
  const exchCtx = useOutletContext();
  const dollarsToCents = useDollarsToCents();
  const centsToDollars = useCentsToDollars;

  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchDeliveries = exchCtx.exchSession.deliveryGroups;

  const locReplacementSum = parLocSt_Replace.replacementSum;
  const locDiscount = parLocSt_Replace.discount;
  const locDiscountPct = parLocSt_Replace.discountPct;
  const locdiscountedTotal = parLocSt_Replace.discountedTotal;

  const fghgf = parseFloat(22.3);

  console.log(fghgf);

  const handleDiscountInput = (event) => {
    let discoInDollars = event.target.value;

    const rawDiscoPct = (discoInDollars / locReplacementSum) * 100;
    const newDiscoPct = parseFloat(rawDiscoPct.toFixed(1));

    setParLocSt_Replace((draft) => {
      draft.discount = discoInDollars;
      draft.discountPct = newDiscoPct;
    });
  };

  const handlePctInput = (event) => {
    let pctInput = parseFloat(event.target.value);

    const newDollarDisco = (locReplacementSum * pctInput) / 100;

    setParLocSt_Replace((draft) => {
      draft.discountPct = pctInput;
      draft.discount = newDollarDisco;
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
            step={10}
            max={100}
            value={locDiscountPct}
            onChange={handlePctInput}
          />
        </MRVinput>
        <MRVinput>
          <input
            type="number"
            min="0"
            max={locReplacementSum}
            step={10}
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
