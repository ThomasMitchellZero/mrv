import classes from "./SessionItems70.module.css";

import StartScanning from "../Index/StartScanning70";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const SessionItems70 = (props) => {
  const returnsContext = props.returnsContext;

  const ctxItems = returnsContext.session.items;



  return ctxItems.length <= 0 ? (
    <StartScanning />
  ) : (
    <section className={classes.container}>
      <TitleBar>Scanned Items</TitleBar>
      <section className={classes.mainContent}>

      </section>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default SessionItems70;

/*



*/
