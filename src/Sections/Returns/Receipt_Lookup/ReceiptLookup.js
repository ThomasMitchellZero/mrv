import classes from "./ReceiptLookup.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

const ReceiptLookup = () => {
  const navigate = useNavigate();
  return (
    <section className={classes.container}>
      <TitleBar
        lefticon={"back"}
        left_onClick={() => {
          navigate("..");
        }}
      >
        Receipt Lookup
      </TitleBar>
      <h2>Look Up Receipts</h2>
    </section>
  );
};

export default ReceiptLookup;
