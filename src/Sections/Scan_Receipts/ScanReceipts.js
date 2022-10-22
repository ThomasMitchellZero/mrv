import classes from "./ScanReceipts.module.css";
import ScanReciepts70 from "./ScanReceipts70";
import { Outlet } from "react-router-dom";

const ScanReceipts = (props) => {
  return (
    <div className={classes.scan_receipts}>
      <ScanReciepts70></ScanReciepts70>

      <Outlet></Outlet>
    </div>
  );
};

export default ScanReceipts;

//    <ScanReceipts30></ScanReceipts30>

//    <DeliveryReturn30></DeliveryReturn30>
