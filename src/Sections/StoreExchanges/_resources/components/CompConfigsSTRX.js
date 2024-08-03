// For STRX-specific configurations of stock MRV components

import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../../../mrv/mrv-components/DisplayOutputs/CashTotalMRV";
import { baseReturnState } from "../../../../globalFunctions/globalJS_classes";
import { NavNodeBarMRV } from "../../../../mrv/mrv-components/inputs/NavNodeBarMRV";
import { useOutletContext } from "react-router";
import { useNodeNavSTRX, baseStateSTRX } from "../hooks/STRXhooks";
import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

const TitleBarSTRX = ({
  hasIcon = null,
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  showNavNodeBar = false,
  navBtnClick = () => {
    console.log("nothing here");
  },
}) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;

  const nodeNavMRV = useNodeNav();

  const navNodeBarSTRX = (
    <NavNodeBarMRV sessionState={sessionMRV} setSessionState={setSessionMRV} />
  );

  return (
    <TitleBarMRV
      hasIcon={hasIcon}
      productName="Store Exchanges"
      showProductName={showProductName}
      headerTitle={headerTitle}
      hasCluster={hasCluster}
      srString=""
      navBtnClick={navBtnClick}
      handleClearSession={() => {
        nodeNavMRV("testScenarios");
        setSessionMRV(() => baseStateSTRX());
      }}
      navNodeBar={navNodeBarSTRX}
      showNavNodeBar={showNavNodeBar}
    ></TitleBarMRV>
  );
};

export { TitleBarSTRX };

/*

*/

const CashTotalSTRX = () => <CashTotalMRV mode={"returnMinusReplace"} />;

export { CashTotalSTRX };
