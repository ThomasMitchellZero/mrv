import classes from "./ScanReceipts70.module.css";
import TitleBar from "../../../components/UI/TitleBar";
import Footer from "../../../components/UI/FooterContainer"
import ScanGraphic from "./ScanGraphic/ScanGraphic";
import { useOutletContext } from "react-router-dom";


const ScanReciepts70 = () => {

  // OK, so it looks like I can pass multiple props via useOutletContext as either an array or an object.
  const test = useOutletContext()
  console.log(test.alpha)
  return (
    <div className={`seventy_panel ${classes.container}`}>
      <TitleBar lefticon="close">Scan Receipts</TitleBar>
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
