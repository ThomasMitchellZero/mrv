import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { PrimaryFooterXDTX } from "../../_resources/components/CompConfigs_XTDX";

function ReturnReasonXDTX() {
  const nodeNav = useNodeNav();

  const handleContinue = () => {
    nodeNav("replacementItems");
  };

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarMRV
          showNavNodeBar={true}
          headerTitle={"Reason For Return"}
        ></TitleBarMRV>
        <div className={`main_content gap2rem alignLeft`}></div>

        <PrimaryFooterXDTX handleContinue={handleContinue} />
      </section>
    </section>
  );
}

export { ReturnReasonXDTX };
