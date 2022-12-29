import classes from "./ReceiptLookup.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

import { useNavigate, useOutletContext, Link } from "react-router-dom";

const ReceiptLookup = () => {
  const navigate = useNavigate();
  return (
    <section className={classes.container}>
      <section className="thirty_panel">
        <TitleBar>Items Missing Invoices</TitleBar>
        <section className={classes.thirtyContent}></section>
        <FooterContainer></FooterContainer>
      </section>
      <section className="seventy_panel">
        <TitleBar
          lefticon={"back"}
          left_onClick={() => {
            navigate("..");
          }}
        >
          Receipt Lookup
        </TitleBar>
        <section className={classes.seventyContent}>
          <h2>Look Up Receipts</h2>
        </section>

        <FooterContainer></FooterContainer>
      </section>
    </section>
  );
};

export default ReceiptLookup;

/*


.seventy_panel{
  display: flex;
  flex-direction: column;
  flex: 7 7 0rem;
  height: 100%;
  box-sizing: border-box;
}

.thirty_panel{





 */
