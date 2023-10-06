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

  const handleDiscountInput = (event) => {
    let discoInDollars = parseFloat(event.target.value);

    discoInDollars =
      discoInDollars > locReplacementSum
        ? locReplacementSum
        : discoInDollars
        ? discoInDollars
        : 0;

    const rawDiscoPct = (discoInDollars / locReplacementSum) * 100;
    const newDiscoPct = parseFloat(rawDiscoPct.toFixed(1));

    setParLocSt_Replace((draft) => {
      draft.discount = discoInDollars;
      draft.discountPct = newDiscoPct;
      draft.discountedTotal = locReplacementSum - discoInDollars;
    });
  };

  const handlePctInput = (event) => {
    let pctInput = parseFloat(event.target.value);
    pctInput = pctInput > 100 ? 100 : pctInput ? pctInput : 0;

    const rawDollarDisco = (locReplacementSum * pctInput) / 100;
    const newDollarDisco = rawDollarDisco.toFixed(2);

    setParLocSt_Replace((draft) => {
      draft.discountPct = pctInput;
      draft.discount = newDollarDisco;
      draft.discountedTotal = locReplacementSum - newDollarDisco;
    });
  };

  return (
    <section className={`discountCtnr`}>
      <div className={`divider horizontal`} />
      <p className={`panel30__section__label`}>Discount:</p>
      <section className={`inputsCtnr`}>
        <MRVinput helperText={`Discount %`} flex={`1 1 0rem`}>
          <input
            type="number"
            min="0"
            step={10}
            max={100}
            value={locDiscountPct}
            onChange={handlePctInput}
          />
        </MRVinput>
        <MRVinput helperText={`Discount $`} flex={`1 1 0rem`}>
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
        title={`Total After Discount:`}
        moneyVal={locdiscountedTotal}
        bigMoney={true}
      />
    </section>
  );
}

export { ReplacementDiscount };
