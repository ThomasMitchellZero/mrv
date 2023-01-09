import classes from "./ScanGraphic.module.css";
import Universal from "../../../../assets/lowes-icons/Picture-Icons/universal-scan.svg";
import Blank from "../../../../assets/lowes-icons/Picture-Icons/blank.svg";

const ScanGraphic = (props) => {
  const graphicSelector = (input) => {
    if (props.graphic === "Universal") {
      return Universal;
    } else {
      return Blank;
    }
  };
  return (
    <div className={classes.container}>
      <img src={graphicSelector(props.graphic)} alt={"Scanning Graphic"} />
      <p className={classes.maintext}>{props.mainText}</p>
      <p className={classes.subtext}>{props.subText}</p>
    </div>
  );
};

export default ScanGraphic;
