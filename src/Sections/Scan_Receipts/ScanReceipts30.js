import classes from "./ScanReceipts30.module.css"
import TitleBar from "../../components/UI/TitleBar";
import VerticalNavMenu from "../../components/UI/VerticalNavMenu";
import FooterContainer from "../../components/UI/FooterContainer"

const ScanReceipts30 = (props) => {
  return (
    <div className={`thirty_panel ${classes.scan_receipts_30}`}>
      <TitleBar>Actions</TitleBar>
      <VerticalNavMenu></VerticalNavMenu>
      <FooterContainer></FooterContainer>
    </div>
  );
};

export default ScanReceipts30;
