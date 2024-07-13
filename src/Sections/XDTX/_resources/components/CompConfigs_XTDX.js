// For STRX-specific configurations of stock MRV components

import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../../../mrv/mrv-components/DisplayOutputs/CashTotalMRV";
import { baseReturnState } from "../../../../globalFunctions/globalJS_classes";
import { NavNodeBarMRV } from "../../../../mrv/mrv-components/inputs/NavNodeBarMRV";
import { useOutletContext } from "react-router";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

const PrimaryFooterXDTX = ({
  handleContinue = () => {
    console.log("No footer button handler");
  },
  btnLabel = "Continue",
}) => {
  return (
    <div className={`footer_content`}>
      <CashTotalMRV mode="returnMinusReplace" />
      <div
        onClick={(e) => {
          console.log("button BG register");
          e.stopPropagation();
        }}
        className={`buttonBox25`}
      >
        <button className={`primary jumbo maxFlex`} onClick={handleContinue}>
          {btnLabel}
        </button>
      </div>
    </div>
  );
};
export { PrimaryFooterXDTX };

/*

*/
