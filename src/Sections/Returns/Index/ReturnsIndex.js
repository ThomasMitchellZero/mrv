import classes from "./ReturnsIndex.module.css";

import ReturnsActions30 from "../ReturnsActions30";
import StartScanning from "./StartScanning";

const ReturnsIndex = (props) => {
  return (
    <main className={classes.container}>
      <section className={`seventy_panel ${classes.session_info}`}>
        <StartScanning />
      </section>
      <section className={`thirty_panel ${classes.action_menu}`}>
        <ReturnsActions30 />
      </section>
    </main>
  );
};

export default ReturnsIndex;
