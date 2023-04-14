import classes from "./ExchHeader.module.css";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

function ExchHeader({
  hasIcon = "back",
  headerTitle = "Title",
  orderNum = "XXX",
  hasCluster = true,
  navBtnClick = () => {
    console.log("nothing here");
  },
}) {
  const iconsObj = {
    back: <MdOutlineClose fontSize="1.5rem" />,
    close: <MdArrowBack fontSize="1.5rem" />,
  };

  const navButton = hasIcon ? (
    <button
      onClick={() => {
        navBtnClick();
      }}
      className={`mrvBtn ${classes.navBtn}`}
    >
      {iconsObj[hasIcon]}
    </button>
  ) : null;

  const orderCancelCluster = (
    <section className={`${classes.defaultHeight}`}>
      <p className={`body`}>{`Order # ${orderNum}`}</p>
      <button className={`mrvBtn ghost ${classes.defaultHeight}`}>
        Cancel Exchange <MdArrowBack />
      </button>
    </section>
  );

  return (
    <section className={`main_col  ${classes.container}`}>
      {navButton}
      <section className={`${classes.mainTitle}`}>
        <p className={`tiny-text`}>Exchanges</p>
        <section className={`${classes.defaultHeight}`}>
          <h3 className={``}>{headerTitle}</h3>
        </section>
      </section>
      {hasCluster ? orderCancelCluster : null}
    </section>
  );
}

export { ExchHeader };

/*

defaultHeight

mainTitle

*/
