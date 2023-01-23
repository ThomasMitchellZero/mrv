import classes from "./TenderTypesLI.module.css";

import tenderTypes from "../../../components/global_functions/tenderTypes";

import {
  MdPanoramaFishEye,
  MdCircle,
  MdWarning,
  MdSubdirectoryArrowRight,
} from "react-icons/md";

const tType = tenderTypes;

const iconsObj = {
  inProgress: <MdPanoramaFishEye className={`green-text ${classes.icon}`} />,
};

const TenderTypesLI = ({ dataObj }) => {
  return (
    <section className={classes.container}>
      <section className={classes.leftColumn}>
        <div className={`${classes.lineHeight}`}>{iconsObj.inProgress}</div>
        <div
          className={`grey-04 ${classes.lineHeight} ${classes.stepLine}`}
        ></div>
      </section>
      <section className={classes.mainContent}>M</section>
    </section>
  );
};

export default TenderTypesLI;
