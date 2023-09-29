import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";
import { useExchNav } from "../../_Resources/customHooks/useExchNav";
import { MoneyRow } from "../../_Resources/components/displayOutputs/MoneyRow";
import { useOutletContext } from "react-router";

function PaymentSummary({
  title = "",
  money = "",
  textColorClass = "color__primary__text",
}) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;
  const exchDeliveries = exchCtx.exchSession.deliveryGroups;

  const exchNav = useExchNav();
  
  return (
    <section className={`mrvPanel__side `}>
      <ExchHeader
        hasCluster={false}
        headerTitle={"Payment Summary"}
        hasProductName={false}
      />
      <section className={`main_content`}>
        <MoneyRow title="Charges" money={123} />
      </section>
      <section className={`footer_text`}>
        <p className={`tinyText warning`}></p>
      </section>
      <section className={`footer_content`}>
        <div className={`buttonBox`}>
          <button
            onClick={() => {
              exchNav({ routeStr: "receipt" });
            }}
            className={`mrvBtn primary fullWidth jumbo`}
          >
            Continue
          </button>
        </div>
      </section>
    </section>
  );
}

export { PaymentSummary };
