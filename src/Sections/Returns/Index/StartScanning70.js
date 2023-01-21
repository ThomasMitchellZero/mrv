import classes from "./StartScanning70.module.css";

import ScanGraphic from "./ScanGraphic/ScanGraphic";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import RefundTotal from "../../../components/UI/DisplayOutputs/RefundTotal";

const StartScanning = ({ moneyObj }) => {


  return (
    <main className={`${classes.container}`}>
      <section className={classes.mainContent}>
        <ScanGraphic
          graphic="Universal"
          mainText="Start Scanning"
          subText="You may scan or enter multiple receipts or items"
        ></ScanGraphic>
      </section>
      <FooterContainer>
        <RefundTotal
          dataObj={moneyObj}
          hideAdjust={false}
        />
      </FooterContainer>
    </main>
  );
};

export default StartScanning;

/*



*/
