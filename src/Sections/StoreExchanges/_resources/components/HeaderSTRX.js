
import { TitleBarMRV } from "../../../../mrv/mrv-components/DisplayOutputs/TitleBarMRV";

const HeaderSTRX = ({
  hasIcon = null,
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  navBtnClick = () => {
    console.log("nothing here");
  },
  handleClearSession = () => {
    console.log("No Clear Session Fn");
  },
}) => {
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
    ></TitleBarMRV>
  );
};

export { HeaderSTRX };
