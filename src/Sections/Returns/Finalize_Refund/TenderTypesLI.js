import classes from "./TenderTypesLI.module.css";

import tenderTypes from "../../../components/global_functions/tenderTypes";
import tenderStatusCodes from "../functions/tenderStatusCodes";

import {
  MdPanoramaFishEye,
  MdCheckCircle,
  MdWarning,
  MdSubdirectoryArrowRight,
} from "react-icons/md";

const tType = tenderTypes;
const tStatus = tenderStatusCodes;

const iconsObj = {
  notStarted: <MdPanoramaFishEye className={`grey-06-text ${classes.icon}`} />,
  inProgress: <MdPanoramaFishEye className={`green-text ${classes.icon}`} />,
  failure: <MdWarning className={`gold-text ${classes.icon}`} />,
  complete: <MdCheckCircle className={`green-text ${classes.icon}`} />,
};

const mainStatus = {
  notStarted: {
    icon: iconsObj.notStarted,

  },
  inProgress: {
    icon: iconsObj.inProgress,

    active: true,
  },
  progress2Line: {
    icon: iconsObj.inProgress,
    line2: true,
    strike: classes.strike,
  },
  failure: {
    icon: iconsObj.failure,
    line2: true,
    strike: classes.strike,
  },
  complete: {
    icon: iconsObj.complete,
  },
  swapped:{
    icon: iconsObj.complete,
    strike: classes.strike,
  },
};

const TenderTypesLI = ({ dataObj }) => {

    // JS code

  //const status = dataObj.status;
  const status = "swapped";
  return (
    <section
      className={`${classes.container} ${
        mainStatus[status].active ? classes.activeText : ""
      }`}
    >
      <section className={classes.leftColumn}>
        <div className={`${classes.lineHeight}`}>{mainStatus[status].icon}</div>
        <div
          className={`grey-04 ${classes.lineHeight} ${classes.stepLine}`}
        ></div>
      </section>

      <section className={` ${classes.columnHolder}`}>
        <section className={`${classes.columnHolder}`}>
          {/* Line 1 */}
          <section className={` ${classes.lineHeight}`}>
            <h5 className={`${classes.XXX}`}>{dataObj.tenderLabel}</h5>
            <h4 className={`${mainStatus[status].strike ?? ""}`}>{`$${(
              dataObj.paid / 100
            ).toFixed(2)}`}</h4>
          </section>
          <section className={`${classes.lineHeight}`}>
            <h5>{`Not Started`}</h5>
          </section>
        </section>
        {/* Line 2 */}
        {mainStatus[status].line2 ? (
          <section className={`${classes.L2container} ${classes.activeText}`}>
            <section className={classes.leftColumn}>
              <div className={`${classes.lineHeight}`}>
                {iconsObj.inProgress}
              </div>
              <div
                className={`grey-04 ${classes.lineHeight} ${classes.stepLine}`}
              ></div>
            </section>
            <section className={`${classes.columnHolder}`}>
              {/* Line 2 */}
              <section className={` ${classes.lineHeight}`}>
                <h5 className={`${classes.XXX}`}>{dataObj.tenderLabel}</h5>
                <h4>{`$${(dataObj.paid / 100).toFixed(2)}`}</h4>
              </section>
              <section className={`${classes.lineHeight}`}>
                <h5>{`Not Started`}</h5>
              </section>
            </section>
          </section>
        ) : null}
      </section>
    </section>
  );
};

export default TenderTypesLI;
