import "./_ExchHeader.css"
import { defaultExchState } from "../../glossary/glossaryExch";

import { MdOutlineClose, MdArrowBack } from "react-icons/md";

import { useOutletContext, useNavigate } from "react-router";

function ExchHeader({
  hasIcon = null,
  hasProductName = true,
  headerTitle = "Title",
  hasCluster = true,
  navBtnClick = () => {
    console.log("nothing here");
  },
}) {
  const exchCtx = useOutletContext();
  const navigate = useNavigate();
  const activeSr = exchCtx.exchSession.activeSaleRecord;
  const setExchState = exchCtx.setExchSession;

  const srString = activeSr?.key
    ? `${activeSr.type.str} # ${activeSr.key}`
    : "";

  const iconsObj = {
    close: <MdOutlineClose fontSize="1.5rem" />,
    back: <MdArrowBack fontSize="1.5rem" />,
  };

  const handleClearSession = () => {
    navigate("/mrv/exchanges");
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
      className={`mrvBtn navBtn`}
    >
      {iconsObj[hasIcon]}
    </button>
  ) : null;

  const orderCancelCluster = (
    <section className={`defaultHeight`}>
      <p className={`body`}>{`${srString}`}</p>
      <button
        className={`mrvBtn ghost defaultHeight`}
        onClick={() => handleClearSession()}
      >
        End Exchange
      </button>
    </section>
  );

  return (
    <section className={`exchHeader exchHeader_Top`}>
      {navButton}
      <section className={`mainTitle`}>
        <p className={`tiny-text`}>{hasProductName ? "Exchanges" : " "}</p>
        <section className={`defaultHeight`}>
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
