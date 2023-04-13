import classes from "./MRVheader.module.css";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

function MRVheader({
  hasIcon = "back",
  navBtnClick = () => {
    console.log("test");
  },
  headerTitle = "Title",
  orderNum = "XXX",
}) {
  const navButton = (icon) => {
    const iconsObj = {
      back: <MdOutlineClose fontSize="1.5rem" />,
      close: <MdArrowBack fontSize="1.5rem" />,
    };
    return (
      <button
        onClick={() => {
          navBtnClick();
        }}
        className={`${classes.navBtn}`}
      >
        {iconsObj[icon]}
      </button>
    );
  };

  return (
    <section className={`main_col ${classes.container}`}>
      {hasIcon ? navButton(hasIcon) : null}
      <section className={`${classes.mainTitle}`}>
        <p className={`tiny-text`}>Exchanges</p>
        <section className={`${classes.defaultContainer}`}>
          <h3 className={``}>{headerTitle}</h3>
        </section>
      </section>
      <div className={`${classes.defaultContainer}`}>
        <p className={`body`}>
          {`Order # ${orderNum}`}
        </p>
      </div>
    </section>
  );
}

export { MRVheader };

/*

defaultContainer

mainTitle

*/
