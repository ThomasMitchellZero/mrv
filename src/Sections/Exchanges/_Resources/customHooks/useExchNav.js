import { useOutletContext, useNavigate } from "react-router";

function useExchNav() {
  const navigate = useNavigate();

  const exchCtx = useOutletContext();
  const setSessionSt = exchCtx.setExchSession;

  return ({routeStr = ""}) => {
    // if I want I can add a second argument to handle custom activePanels, but I think I'm probably fine.  

    const exchNavObj = {
      exchreason: {
        route: "../exchreason",
        activePanels: {
          left: "",
          main: "fart",
          right: "",
        },
        ptNode: "exchreason",
      },

      chooseitems: {
        route: "chooseitems",
        activePanels: {
          left: "",
          main: "",
          right: "",
        },
        ptNode: "chooseitems",
      },
    };

    const thisRoute = exchNavObj[routeStr];

    setSessionSt((draft) => {
      draft.activePanels = thisRoute.activePanels;
      draft.ptState.activeNode = thisRoute.ptNode;
    });

    navigate(thisRoute.route);
  };
}

export { useExchNav };
