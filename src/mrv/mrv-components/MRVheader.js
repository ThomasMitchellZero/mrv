import classes from "./MRVheader.module.css";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

function MRVheader({ hasIcon = "back" }) {
  const navButton = (icon) => {
    return <button className={`${classes.navBtn}`}>{icon}</button>;
  };
  const iconsObj = {
    back: navButton(<MdOutlineClose fontSize="1.5rem" />),
  };

  return (
    <section className={`main_col ${classes.container}`}>
      {iconsObj?.[hasIcon]}
      <section className={`${classes.mainTitle}`}>
        <p className={`tiny-text`}>Exchanges</p>
        <section className={`${classes.defaultContainer}`}>
          <h3 className={``}>Select items for exchange</h3>
        </section>
      </section>
    </section>
  );
}

export { MRVheader };

/*

defaultContainer

mainTitle

*/
