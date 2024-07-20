import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

import { PrimaryFooterXDTX } from "../../_resources/components/CompConfigs_XTDX";

function ReplacementItemsXDTX() {
  const nodeNav = useNodeNav();

  const handleContinue = () => {
    nodeNav("scheduleDelivery");
  };

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarMRV
          showNavNodeBar={true}
          headerTitle={"Replacement Items"}
        ></TitleBarMRV>
        <div className={`main_content gap2rem alignLeft`}></div>

        <PrimaryFooterXDTX handleContinue={handleContinue} />
      </section>
    </section>
  );
}

export { ReplacementItemsXDTX };
