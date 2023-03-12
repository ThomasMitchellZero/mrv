import { useOutletContext } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";

const useSetLocalPanels = () => {
  const returnsCtx = useOutletContext();
  const dispatchToSession = returnsCtx.dispatchSession;
  const existingPanels = cloneDeep(returnsCtx.session.activeLocalPanels);

  return ({
    newP1,
    newP2,
    newP3,
    setAllDetails,
    addDetails,
    clearAll = false,
  }) => {
    let outLocalPanels = existingPanels;

    //URLS with multiple possible panels will display P1-P3 in order of left to right.

    if (newP1) {
      outLocalPanels.p1 = newP1;
    }
    if (newP2) {
      outLocalPanels.p2 = newP2;
    }
    if (newP3) {
      outLocalPanels.p3 = newP3;
    }
    if (setAllDetails) {
      outLocalPanels.panelDetails = setAllDetails;
    }
    if (addDetails) {
      outLocalPanels.panelDetails = {
        ...addDetails,
      };
    }
    if (clearAll) outLocalPanels = {};

    dispatchToSession({ type: "SET_LOCAL_PANEL", payload: outLocalPanels });
  };
};

export { useSetLocalPanels };
