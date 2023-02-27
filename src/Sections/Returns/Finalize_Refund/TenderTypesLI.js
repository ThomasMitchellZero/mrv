import classes from "./TenderTypesLI.module.css";

import tStatus from "../functions/tenderStatusCodes";

import {
  MdPanoramaFishEye,
  MdCheckCircle,
  MdWarning,
  MdSubdirectoryArrowRight,
} from "react-icons/md";

const iconsObj = {
  notStarted: <MdPanoramaFishEye className={`grey-06-text ${classes.icon}`} />,
  inProgress: <MdPanoramaFishEye className={`green-text ${classes.icon}`} />,
  failure: <MdWarning className={`gold-text ${classes.icon}`} />,
  complete: <MdCheckCircle className={`green-text ${classes.icon}`} />,
  arrow: (
    <MdSubdirectoryArrowRight className={`grey-10-text ${classes.icon}`} />
  ),
};

const TenderTypesLI = ({ tenderObj }) => {

  const swapLabel = tenderObj.refundAs ?? "OTHER"
  // Status specifics for each LI
  const mainStatus = {
    [tStatus.notStarted]: {
      icon: iconsObj.notStarted,
      statusLabel: "Not Started",
    },
    [tStatus.inProgress]: {
      icon: iconsObj.inProgress,
      active: true,
      statusLabel: "In Progress",
    },
    [tStatus.progress2Line]: {
      icon: iconsObj.inProgress,
      line2: true,
      strike: classes.strike,
      statusLabel: "In Progress",
    },
    [tStatus.failure]: {
      icon: iconsObj.failure,
      statusLabel: "Auto Credit Failed",
      active: true,
    },
    [tStatus.complete]: {
      icon: iconsObj.complete,
      statusLabel: "Complete",
    },
    [tStatus.swapped]: {
      icon: iconsObj.complete,
      strike: classes.strike,
      statusLabel: `Refunding as ${swapLabel}`
    },
  };

  //const status = tStatus.swapped;
  const status = tenderObj.status;
  return (
    <section
      className={`${classes.container} ${
        mainStatus[status].active ? classes.activeText : ""
      }`}
    >
      {/* Full LI Column */}
      <section className={classes.leftColumn}>
        <div className={`${classes.lineHeight}`}>{mainStatus[status].icon}</div>
        <div
          className={`grey-04 ${classes.lineHeight} ${classes.stepLine}`}
        ></div>
      </section>

      <section className={` ${classes.columnHolder}`}>
        {/* Cell 1 Main Content*/}
        <section className={`${classes.columnHolder}`}>
          <section className={` ${classes.lineHeight}`}>
            <h5 className={`${classes.XXX}`}>{tenderObj.tenderLabel}</h5>
            <h4
              className={`${mainStatus[status].strike}`}
            >{`$${tenderObj.displayPaid}`}</h4>
          </section>
          <section className={`${classes.lineHeight}`}>
            <h5>{`${mainStatus[status].statusLabel}`}</h5>
          </section>
        </section>
        {/* Cell 2 */}
        {mainStatus[status].line2 ? (
          <section className={`${classes.L2container} ${classes.activeText}`}>
            {/* Cell 2 Column*/}
            <section className={classes.leftColumn}>
              <div className={`${classes.lineHeight}`}>
                {iconsObj.inProgress}
              </div>
              <div
                className={`grey-04 ${classes.lineHeight} ${classes.stepLine}`}
              ></div>
            </section>
            <div className={`${classes.lineHeight}`}>{iconsObj.arrow}</div>

            {/* Cell 2 Main Content */}
            <section className={`${classes.columnHolder}`}>
              <section className={` ${classes.lineHeight}`}>
                <h5 className={`${classes.XXX}`}>{"Cash"}</h5>
                <h4>{`$${(tenderObj.paid / 100).toFixed(2)}`}</h4>
              </section>
              <section className={`${classes.lineHeight}`}>
                <h5>{`In Progress`}</h5>
              </section>
            </section>
          </section>
        ) : null}
      </section>
    </section>
  );
};

export default TenderTypesLI;
