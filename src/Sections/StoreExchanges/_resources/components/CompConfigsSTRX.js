// For STRX-specific configurations of stock MRV components

import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { CashTotalMRV } from "../../../../mrv/mrv-components/DisplayOutputs/CashTotalMRV";
import { baseReturnState } from "../../../../globalFunctions/globalJS_classes";
import { NavNodeBarMRV } from "../../../../mrv/mrv-components/inputs/NavNodeBarMRV";
import { useOutletContext } from "react-router";
import { useNodeNavSTRX } from "../hooks/STRXhooks";

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
  const strxCtx = useOutletContext();
  const sessionSTRX = strxCtx.sessionSTRX;
  const setSessionStrx = strxCtx.setSessionStrx;
  const nodeNavSTRX = useNodeNavSTRX();
  const navNodeBarSTRX = (
    <NavNodeBarMRV
      sessionState={sessionSTRX}
      setSessionState={setSessionStrx}
    />
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
        nodeNavSTRX("testScenarios");
      }}
      navNodeBar={navNodeBarSTRX}
      showNavNodeBar={showNavNodeBar}
    ></TitleBarMRV>
  );
};

export { TitleBarSTRX };

const CashTotalSTRX = ({ mode = "exchDelta" }) => {
  const strxCtx = useOutletContext();
  const sessionSTRX = strxCtx.sessionSTRX;
  return <CashTotalMRV mode={mode} sessionState={sessionSTRX} />;
};

export { CashTotalSTRX };
