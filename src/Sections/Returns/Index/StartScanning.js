import classes from "./StartScanning.module.css";

import ScanGraphic from "./ScanGraphic/ScanGraphic";
import FooterContainer from "../../../components/UI/FooterContainer";
import TitleBar from "../../../components/UI/TitleBar";

const StartScanning = () => {
  return (
    <main className={`seventy_panel ${classes.container}`}>

      <section>
        <ScanGraphic graphic="Universal" mainText="Start Scanning" subText="You may scan or enter multiple receipts or items"></ScanGraphic>
      </section>
      <FooterContainer></FooterContainer>
    </main>
  );
};

export default StartScanning;
