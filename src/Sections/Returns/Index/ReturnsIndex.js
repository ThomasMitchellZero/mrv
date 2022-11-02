import classes from "./ReturnsIndex.module.css"

import ReturnsActions30 from "../ReturnsActions30";
import StartScanning from "./StartScanning";

const ReturnsIndex = (props) => {
  return <main className={classes.container}>
    <StartScanning />
    <ReturnsActions30/>
  </main>;
};

export default ReturnsIndex;
