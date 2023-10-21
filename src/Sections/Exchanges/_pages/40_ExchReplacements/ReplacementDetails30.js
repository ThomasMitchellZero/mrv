import { ReplacementDiscount } from "./ReplacementDiscount";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { MoneyRow } from "../../_Resources/components/displayOutputs/MoneyRow";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { useOutletContext } from "react-router";

function ReplacementDetails30({ parLocSt_Replace, setParLocSt_Replace }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchSwapGroups = exchCtx.exchSession.allSwapGroups;

  const exchNav = useExchNav();

  const handleApply = () => {};

  return (
    <section className={`mrvPanel__side RI_Panel30 `}>
      <ExchHeader
        hasCluster={false}
        headerTitle={"Replacement Items"}
        hasProductName={false}
      />
      <section className={`main_content`}>
        <ProductInfo
          itemObj={exchSwapGroups["400"].swaps["mainItem"].returningItem}
        />
        <div className={`divider horizontal`} />
        <p className={`panel30__section__label`}>Cost Differences:</p>
        <MoneyRow
          title={`Replacement Items:`}
          moneyVal={parLocSt_Replace.replacementSum}
        />
        <MoneyRow
          title={`Replacement Total:`}
          moneyVal={parLocSt_Replace.replacementSum}
          bigMoney={true}
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
