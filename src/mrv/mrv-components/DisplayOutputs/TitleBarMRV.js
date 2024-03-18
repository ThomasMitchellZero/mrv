import "./TitleBarMRV.css";

import { MdOutlineClose, MdArrowBack } from "react-icons/md";
import { NavNodeBarMRV } from "../inputs/NavNodeBarMRV";
import { useOutletContext } from "react-router";

function TitleBarMRV({
  hasIcon = null,
  productName = "",
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  srString = "",
  showNavNodeBar = false,
  navBtnClick = () => {
    console.log("nothing here");
  },
  handleClearSession = () => {
    console.log("No Clear Session Fn");
  },
}) {
  const strxCtx = useOutletContext();
  const sessionSTRX = strxCtx.sessionSTRX;
  const setSessionStrx = strxCtx.setSessionStrx;
  const navNodeBarSTRX = (
    <NavNodeBarMRV
      sessionState={sessionSTRX}
      setSessionState={setSessionStrx}
    />
  );

  const iconsObj = {
    close: <MdOutlineClose fontSize="1.5rem" />,
    back: <MdArrowBack fontSize="1.5rem" />,
  };

  // Sets nav button with user-specified icon and function.  Null if no icon
  const navButton = hasIcon ? (
    <button
      onClick={() => {
        navBtnClick();
      }}
      className={`mrvBtn navBtn`}
    >
      {iconsObj[hasIcon]}
    </button>
  ) : null;

  const cancelCluster = (
    <section className={``}>
      <p className={`body`}>{`${srString}`}</p>
      <button
        className={`mrvBtn cancelBtn ghost `}
        onClick={() => handleClearSession()}
      >
        {`End ${productName}`}
      </button>
    </section>
  );

  return (
    <section className={`titleBarMRV`}>
      <div className={`primaryRow`}>
        {navButton}
        <div className={`heading__medium title`}>{headerTitle}</div>
        <div className={`spacer`} />
        {hasCluster ? cancelCluster : null}
      </div>
      <div className={`secondaryRow`}>
        <div className={`tiny-text appTitle`}>
          {showProductName ? `${productName}` : " "}
        </div>
        {showNavNodeBar ? navNodeBarSTRX : null}
      </div>
    </section>
  );
}

export { TitleBarMRV };

/*

defaultHeight

mainTitle

*/
