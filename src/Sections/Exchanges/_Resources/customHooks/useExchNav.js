import { useOutletContext, useNavigate } from "react-router";

function useExchNav() {
  const navigate = useNavigate();

  const exchCtx = useOutletContext();
  const setSessionSt = exchCtx.setExchSession;

  return ({ routeStr = "" }) => {
    // if I want I can add a second argument to handle custom activePanels, but I think I'm probably fine.

    // How to handle back?

    const exchNavObj = {
        
      index: {
        route: "/mrv/exchanges/",
        activePanels: {
          left: "shlllarrt",
          main: "",
          right: "",
        },
        ptNode: "chooseitems",
      },

      chooseitems: {
        route: "/mrv/exchanges/chooseitems",
        activePanels: {
          left: "",
          main: "shart",
          right: "",
        },
        ptNode: "chooseitems",
      },

      exchreason: {
        route: "/mrv/exchanges/exchreason",
        activePanels: {
          left: "",
          main: "fart",
          right: "",
        },
        ptNode: "exchreason",
      },


      whichforwhat:{
        route: "/mrv/exchanges/whichforwhat",
        activePanels: {
          left: "",
          main: "",
          right: "",
        },
        ptNode: "whichforwhat",
      }
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
