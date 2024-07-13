import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { PrimaryFooterXDTX } from "../../_resources/components/CompConfigs_XTDX";

function ReturnItemsXDTX() {
  const nodeNav = useNodeNav();

  const handleContinue = () => {
    nodeNav("returnReason");
  };

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarMRV
          showNavNodeBar={true}
          headerTitle={"Choose Items Being Returned"}
        ></TitleBarMRV>
        <div className={`main_content gap2rem alignLeft`}></div>

        <PrimaryFooterXDTX handleContinue={handleContinue} />
      </section>
    </section>
  );
}

export { ReturnItemsXDTX };
