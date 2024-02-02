import { HeaderMRV } from "../../../../mrv/mrv-components/DisplayOutputs/HeaderMRV";

const HeaderSTRX = ({
  hasIcon = null,
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  srString = "",
  navBtnClick = () => {
    console.log("nothing here");
  },
  handleClearSession = () => {
    console.log("No Clear Session Fn");
  },
}) => {
  return (
    <HeaderMRV
      hasIcon={hasIcon}
      productName="Store Exchanges"
      showProductName={showProductName}
      headerTitle={headerTitle}
      hasCluster={hasCluster}
      srString={srString}
      navBtnClick={navBtnClick}
      handleClearSession={handleClearSession}
    ></HeaderMRV>
  );
};

export { HeaderSTRX };
