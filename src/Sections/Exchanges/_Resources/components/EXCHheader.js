import classes from "./ExchHeader.module.css";

import { defaultExchState } from "../glossary/glossaryExch";

import { MdOutlineClose, MdArrowBack } from "react-icons/md";

import { useOutletContext, useNavigate } from "react-router";

function ExchHeader({
  hasIcon = null,
  headerTitle = "Title",
  hasCluster = true,
  navBtnClick = () => {
    console.log("nothing here");
  },
}) {
  const exchCtx = useOutletContext();
  const navigate = useNavigate();
  const activeOrder = exchCtx.exchSession.activeOrder;

  const setExchState = exchCtx.setExchSession;

  const iconsObj = {
    close: <MdOutlineClose fontSize="1.5rem" />,
    back: <MdArrowBack fontSize="1.5rem" />,
  };

  const handleClearSession = () => {
    navigate("/mrv/exchanges")
    setExchState(() => {
      return defaultExchState;
    });
  };

  // Sets nav button with user-specified icon and function.  Null if no icon
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
      <p className={`body`}>{`Order # ${activeOrder}`}</p>
      <button
        className={`mrvBtn ghost ${classes.defaultHeight}`}
        onClick={() => handleClearSession()}
      >
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