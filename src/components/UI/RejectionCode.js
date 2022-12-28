import classes from "./RejectionCode.module.css";
import { MdError, MdWarning } from "react-icons/md";

const alert = <MdError className={`icon-alert ${classes.icon}`} />;
const warning = <MdWarning className={`icon-warning ${classes.icon}`} />;


// the default code generation function if the user doesn't specify something else.
const defaultCoder = (preSearch = true, itemObj) => {
  const category = itemObj.specialCategories ?? null;

  const outObj = {
    missingInvo: {
      icon: alert,
      message: "Missing Invoice",
    },
    ard: {
      icon: warning,
      message: "ARD - Receipt Required",
    },
    sos: {
      icon: warning,
      message: "SOS - Receipt Required",
    },
    expired: {
      icon: warning,
      message: "Past 90 Days",
    },
    recieptRequired: {
      icon: warning,
      message: "Receipt Required",
    },
  };

  // returns a rejection reason obj based on the return phase and any special conditions in the item.  Otherwise the code is Receipt Required.
  const output = preSearch
    ? outObj.missingInvo
    : category.SOS
    ? outObj.sos
    : category.ARD
    ? outObj.ard
    : category.expired
    ? outObj.expired
    : outObj.recieptRequired;

  return output;
};

const iconCoder = ({ isPreSearch, itemObj, outputFunction = defaultCoder }) => {

  const contentObj = outputFunction(isPreSearch, itemObj);

  return (
    <section className={classes.container}>
      {contentObj.icon}
      <h4>{contentObj.message}</h4>
    </section>
  );
};

export default iconCoder;
