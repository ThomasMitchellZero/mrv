import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import {
  ProdClass,
  InvoProduct,
  navNode,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useSetSessionItems,
  useSetSessionInvos,
  useNodeNav,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { cloneDeep, isEmpty } from "lodash";

//// Item Handlers ////

const useSetSessionItemsSTRX = () => {
  // mrv qty changer, but configured for STRX.
  const strxCtx = useOutletContext();
  return useSetSessionItems({
    sessionState: strxCtx.sessionSTRX,
    setSessionState: strxCtx.setSessionStrx,
  });
};

const useSetSessionInvosSTRX = () => {
  const strxCtx = useOutletContext();
  return useSetSessionInvos({
    sessionState: strxCtx.sessionSTRX,
    setSessionState: strxCtx.setSessionStrx,
  });
};

const useNodeNavSTRX = () => {
  const strxCtx = useOutletContext();
  return useNodeNav({
    sessionState: strxCtx.sessionSTRX,
    setSessionState: strxCtx.setSessionStrx,
  });
};

const defaultNavNodesSTRX = {
  testScenarios: navNode({
    keyStr: "testScenarios",
    titleStr: "Start",
    isActive: false,
    isAvailable: true,
    routeStr: "mrv/store-exchanges",
  }),
  replacementCheck: navNode({
    keyStr: "replacementCheck",
    titleStr: "Replacement Check",
    isActive: false,
    isAvailable: false,
    routeStr: "mrv/store-exchanges/replacement-check",
  }),
  returns: navNode({
    keyStr: "returns",
    titleStr: "Returns",
    breadcrumb: true,
    isActive: false,
    isAvailable: false,
    routeStr: "mrv/store-exchanges/choose-items-invos",
  }),
  reason: navNode({
    keyStr: "reason",
    titleStr: "Reason",
    breadcrumb: true,
    isActive: false,
    isAvailable: false,
    routeStr: "mrv/store-exchanges/reason",
  }),
  replacements: navNode({
    keyStr: "replacements",
    titleStr: "Replacements",
    breadcrumb: true,
    isActive: false,
    isAvailable: false,
    routeStr: "mrv/store-exchanges/replacements",
  }),
  review: navNode({
    keyStr: "review",
    titleStr: "Review",
    breadcrumb: true,
    isActive: false,
    isAvailable: false,
    routeStr: "mrv/store-exchanges/review",
  }),
};

function useInitializeNavSTRX() {
  // haven't implemented this yet, but it will be used to reset the nav nodes to their default state.

  // set STRX nav nodes to default state
  const strxCtx = useOutletContext();
  const initializeNavStrx = () => {
    strxCtx.setSessionStrx((draft) => {
      draft.oNavNodes = defaultNavNodesSTRX;
    });
  };

  return initializeNavStrx;
}

export {
  useSetSessionItemsSTRX,
  useSetSessionInvosSTRX,
  defaultNavNodesSTRX,
  useNodeNavSTRX,
  useInitializeNavSTRX,
};
