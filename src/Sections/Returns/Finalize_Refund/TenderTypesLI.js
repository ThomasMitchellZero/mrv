import classes from "./TenderTypesLI.module.css";

import tenderTypes from "../../../components/global_functions/tenderTypes";
import tenderStatusCodes from "../functions/tenderStatusCodes";

import {
  MdPanoramaFishEye,
  MdCircle,
  MdWarning,
  MdSubdirectoryArrowRight,
} from "react-icons/md";

const tType = tenderTypes;
const tStatus = tenderStatusCodes;

const iconsObj = {
  inProgress: <MdPanoramaFishEye className={`green-text ${classes.icon}`} />,
};

const mainStatus = {
  notStarted: {},
  inProgress: {},
  progress2Line: {},
  complete: {},
  failure: {},
};

const TenderTypesLI = ({ dataObj }) => {
  const status = dataObj.status;
  return (
    <section className={`${classes.container}`}>
      <section className={classes.leftColumn}>
        <div className={`${classes.lineHeight}`}>{iconsObj.inProgress}</div>
        <div
          className={`grey-04 ${classes.lineHeight} ${classes.stepLine}`}
        ></div>
      </section>

      <section className={`${classes.columnHolder}`}>
        <section className={`${classes.columnHolder}`}>
          {/* Line 1 */}
          <section className={` ${classes.lineHeight}`}>
            <h5 className={`${classes.XXX}`}>{dataObj.tenderLabel}</h5>
            <h4>{`$${(dataObj.paid / 100).toFixed(2)}`}</h4>
          </section>
          <section className={`${classes.lineHeight}`}>
            <h5>{`Not Started`}</h5>
          </section>
        </section>
        {/* Line 2 */}
        {true ? (
          <section className={`${classes.L2container}`}>
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