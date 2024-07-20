import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";
import { useOutletContext } from "react-router";

import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";

import { PrimaryFooterXDTX } from "../../_resources/components/CompConfigs_XTDX";

function ReturnItemsXDTX() {
  const nodeNav = useNodeNav();

  const mrvCtx = useOutletContext();
  const setSessionMRV = mrvCtx.setSessionMRV;
  const sessionMRV = mrvCtx.sessionMRV;
  const oXDTInvos = Object.values(sessionMRV.sessionInvos);

  console.log("oXDTInvos", oXDTInvos);

  const aInvoItems = oXDTInvos[0].itemAtomsArr; // FtTB, only one invo per Exchange
  console.log("aInvoItems", aInvoItems);

  const handleContinue = () => {
    nodeNav("returnReason");
  };

  const uiItemRow = ({ itemAtom }) => {
    return (
      <div key={itemAtom.atomItemNum} className={`hBox cardStyle minFlex`}>
        <MRVitemDetails
          thisItemAtom={itemAtom}
          showPrice={true}
          showQty={true}
          qty={itemAtom.atomItemQty}
        />
      </div>
    );
  };

  const uiItemsArr = aInvoItems.map((item) => {
    console.log("fart");
    return uiItemRow({ itemAtom: item });
  });

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarMRV
          showNavNodeBar={true}
          headerTitle={"Choose Items Being Returned"}
        ></TitleBarMRV>
        <div className={`main_content gap2rem alignLeft`}>
          <div className={`cardContainer`}>{uiItemsArr}</div>
        </div>

        <PrimaryFooterXDTX handleContinue={handleContinue} />
      </section>
    </section>
  );
}

export { ReturnItemsXDTX };
