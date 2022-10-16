import classes from "./ScanReceipts70.module.css";
import TitleBar from "../../components/UI/TitleBar";
import Footer from "../../components/UI/FooterContainer"
import ScanGraphic from "./ScanGraphic/ScanGraphic";


const ScanReciepts70 = () => {
  return (
    <div className={`seventy_panel ${classes.scan_receipts_70}`}>
      <TitleBar>Scan Receipts</TitleBar>
      <div className={classes.main_content}>
        <ScanGraphic
          graphic="Universal"
          mainText="Start Scanning"
          subText="You may scan or enter multiple receipts or items"></ScanGraphic>
      </div>
      <Footer>
        
      </Footer>
    </div>
  );
};

export default ScanReciepts70;
