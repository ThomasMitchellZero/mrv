import classes from "./StartScanning70.module.css";

import ScanGraphic from "./ScanGraphic/ScanGraphic";
import FooterContainer from "../../../components/UI/FooterContainer";

const StartScanning = () => {
  return (
    <main className={`${classes.container}`}>
      <section>
        <ScanGraphic
          graphic="Universal"
          mainText="Start Scanning"
          subText="You may scan or enter multiple receipts or items"
        ></ScanGraphic>
      </section>
      <FooterContainer></FooterContainer>
    </main>
  );
};

export default StartScanning;

/*



*/
