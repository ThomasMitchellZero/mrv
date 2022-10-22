import classes from "./ScanReceipts.module.css";
import ScanReciepts70 from "./ScanReceipts70";
import ScanReceipts30 from "./ScanReceipts30";
import DeliveryReturn30 from "./DeliveryReturn30";

const ScanReceipts = (props) => {
  return (
    <div className={classes.scan_receipts}>
      <ScanReciepts70></ScanReciepts70>

      <DeliveryReturn30></DeliveryReturn30>
    </div>
  );
};

export default ScanReceipts;

//    <ScanReceipts30></ScanReceipts30>

//    <DeliveryReturn30></DeliveryReturn30>
