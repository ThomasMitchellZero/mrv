import classes from "./InvoiceEntry30.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const InvoiceEntry30 = (props) => {
    
  const dispatchActivePanels = props.dispatchActivePanels;

  return (
    <section className={classes.container}>
      <TitleBar
        lefticon="back"
        left_onClick={() =>
          dispatchActivePanels({
            type: "setPanels",
            payload: { set30: "actions" },
          })
        }
      >
        Enter Receipt
      </TitleBar>
      <section></section>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default InvoiceEntry30;
