import { useOutletContext } from "react-router";

function useSetActivePanels() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;

  /* Names describe panels present, NOT size of middle panel */

  return ({ left = "", main = "", right = "" }) => {
    //This forms the string that will be used as the CSS class for the middle.
    let mainClassStr = `${left ? "L" : ""}M${right ? "R" : ""}`;

    setExchState((draft)=>{
        draft.activePanels = {
            left: left,
            main: main,
            right: right,
            mainCSSclass: mainClassStr,
        }
    })
  };
}

export { useSetActivePanels };
