import { ReplacementDiscount } from "./ReplacementDiscount";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { MoneyRow } from "../../_Resources/components/displayOutputs/MoneyRow";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useOutletContext } from "react-router";

function ReplacementDetails30({ parLocSt_Replace, setParLocSt_Replace }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchDeliveries = exchCtx.exchSession.deliveryGroups;

  const exchNav = useExchNav();

  const handleApply = () => {};

  return (
    <section className={`mrvPanel__side RI_Panel30 `}>
      <ExchHeader
        hasCluster={false}
        headerTitle={"ReplacementItems"}
        hasProductName={false}
      />
      <section className={`main_content`}>
        <ProductInfo itemObj={exchItems["400"].returningItem} />
        <div className={`divider horizontal`} />
        <MoneyRow
          title={`Replacement Items`}
          moneyVal={parLocSt_Replace.replacementSum}
        />
        <ReplacementDiscount
          parLocSt_Replace={parLocSt_Replace}
          setParLocSt_Replace={setParLocSt_Replace}
        />
      </section>
      <section className={`footer_text`}>
        <p className={`tinyText warning`}></p>
      </section>
      <section className={`footer_content`}>
        <div className={`buttonBox`}>
          <button
            onClick={handleApply}
            className={`mrvBtn primary fullWidth jumbo`}
          >
            Continue
          </button>
        </div>
      </section>
    </section>
  );
}

export { ReplacementDetails30 };
