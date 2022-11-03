import classes from "./ScanReceipts.module.css";
import ScanReciepts70 from "./ScanReceipts70";
import { Outlet, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const ScanReceipts = (props) => {
  const returnsContext = useOutletContext();
  

  return (
    <div className={classes.scan_receipts}>
      <ScanReciepts70></ScanReciepts70>

      <Outlet context={{...returnsContext}}></Outlet>
    </div>
  );
};

export default ScanReceipts;
