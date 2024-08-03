import "./HeaderMRV.css"

import { MdOutlineClose, MdArrowBack } from "react-icons/md";


function HeaderMRV({
  hasIcon = null,
  productName = "",
  showProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  srString = "",
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
    <section className={`defaultHeight`}>
      <p className={`body`}>{`${srString}`}</p>
      <button
        className={`mrvBtn ghost defaultHeight`}
        onClick={() => handleClearSession()}
      >
        {`End ${productName}`}
      </button>
    </section>
  );

  return (
    <section className={`header mrvHeader`}>
      {navButton}
      <section className={`mainTitle`}>
        <p className={`tiny-text`}>{showProductName ? `${productName}` : " "}</p>
        <section className={`defaultHeight`}>
          <h3 className={``}>{headerTitle}</h3>
        </section>
      </section>
      {hasCluster ? cancelCluster : null}
    </section>
  );
}

export { HeaderMRV };

/*

defaultHeight

mainTitle

*/
