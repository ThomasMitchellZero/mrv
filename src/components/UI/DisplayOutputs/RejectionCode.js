import classes from "./RejectionCode.module.css";
import { MdError, MdWarning } from "react-icons/md";

const alert = <MdError className={`gold-text ${classes.icon}`} />;
const warning = <MdWarning className={`red-text ${classes.icon}`} />;

// the default code generation function if the user doesn't specify something else.
const defaultCoder = (preSearch = true, itemObj) => {
  const category = itemObj.specialCategories ?? null;

  // returns a rejection reason obj based on the return phase and any special conditions in the item.  Otherwise the code is Receipt Required.

  // I don't actually know if this is the best way to handle this? Something seems clunky?  
  const output = preSearch
    ? "missingInvo"

    : category?.SOS
    ? "sos"

    : category?.ARD
    ? "ard"

    : category?.expired
    ? "expired"
    
    : "recieptRequired";

  return output;
};

const iconCoder = ({ isPreSearch, itemObj, outputFunction = defaultCoder }) => {

    const codeOptions = {
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

  const contentCode = outputFunction(isPreSearch, itemObj);

  return (
    <section className={classes.container}>
      {codeOptions[contentCode].icon}
      <h4>{codeOptions[contentCode].message}</h4>
    </section>
  );
};

export default iconCoder;
