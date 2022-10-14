import classes from "./ScanReceipts.module.css";
import ScanReciepts70 from "./ScanReceipts70";
import ScanReceipts30 from "./ScanReceipts30";

const ScanReceipts = (props) => {
  return (
    <div className={classes.scan_receipts}>
      <ScanReciepts70></ScanReciepts70>
      <ScanReceipts30></ScanReceipts30>
    </div>
  );
};

export default ScanReceipts;
