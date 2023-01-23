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
      <section className={`divider-bottom ${classes.mainContent}`}>
        {/* */}
        <section className={`${classes.lineHeight}`}>
          <h5 className={`${classes.XXX}`}>{dataObj.tenderLabel}</h5>
          <h4>{`$${(dataObj.paid/ 100).toFixed(2)}`}</h4>
        </section>
        <section className={`${classes.lineHeight}`}>
          <h5>{`Not Started`}</h5>
        </section>
      </section>
    </section>
  );
};

export default TenderTypesLI;
