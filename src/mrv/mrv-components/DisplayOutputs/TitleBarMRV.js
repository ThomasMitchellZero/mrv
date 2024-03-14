import "./TitleBarMRV.css";

import { MdOutlineClose, MdArrowBack } from "react-icons/md";

function TitleBarMRV({
  hasIcon = null,
  productName = "",
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  srString = "",
  navNode = null,
  navBtnClick = () => {
    console.log("nothing here");
  },
  handleClearSession = () => {
    console.log("No Clear Session Fn");
  },
}) {
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
        <p className={`tiny-text`}>
          {showProductName ? `${productName}` : " "}
        </p>
        {navNode }
      </div>
    </section>
  );
}

export { TitleBarMRV };

/*

defaultHeight

mainTitle

*/