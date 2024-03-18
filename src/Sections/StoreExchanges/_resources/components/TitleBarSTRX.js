import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";
import { NavNodeBarMRV } from "../../../../mrv/mrv-components/inputs/NavNodeBarMRV";
import { useOutletContext } from "react-router";

const TitleBarSTRX = ({
  hasIcon = null,
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  showNavNodeBar = false,
  navBtnClick = () => {
    console.log("nothing here");
  },
  handleClearSession = () => {
    console.log("No Clear Session Fn");
  },
}) => {
  const strxCtx = useOutletContext();
  const sessionSTRX = strxCtx.sessionSTRX;
  const setSessionStrx = strxCtx.setSessionStrx;
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
      handleClearSession={handleClearSession}
      navNodeBar={navNodeBarSTRX}
      showNavNodeBar={showNavNodeBar}
    ></TitleBarMRV>
  );
};

export { TitleBarSTRX };
