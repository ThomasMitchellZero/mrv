import classes from "./SessionInvoices70.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import StartScanning from "../Index/StartScanning70";

const SessionInvoices70 = (props) => {
  const returnsContext = props.returnsContext;

  const ctxInvoices = returnsContext.session.invoices;

  return ctxInvoices ? (
    <StartScanning />
  ) : (
    <section className={classes.container}>
      <TitleBar>Scanned Items</TitleBar>
      <section className={classes.mainContent}></section>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default SessionInvoices70;
