import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import { locSt_AddItemsAndInvosSTRX } from "../../_pages/200_AddItemsAndInvoices/AddItemsAndInvosSTRX";

import {
  ProdClass,
  InvoProduct,
  navNode,
  baseReturnState,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useSetSessionItems,
  useSetSessionInvos,
  useNodeNav,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { cloneDeep, isEmpty } from "lodash";

//// Item Handlers ////



/*  Shouldn't need this, but keeping it for now.

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

*/

const defaultNavNodesSTRX = {
  testScenarios: navNode({
    keyStr: "testScenarios",
    titleStr: "Start",
    routeStr: "/mrv/store-exchanges",
  }),
  replacementCheck: navNode({
    keyStr: "replacementCheck",
    titleStr: "Replacement Check",
    routeStr: "/mrv/store-exchanges/replacement-check",
  }),
  returns: navNode({
    keyStr: "returns",
    titleStr: "Returns",
    breadcrumb: true,
    routeStr: "/mrv/store-exchanges/choose-items-invos",
    locSt: locSt_AddItemsAndInvosSTRX,
  }),
  reason: navNode({
    keyStr: "reason",
    titleStr: "Reason",
    breadcrumb: true,
    routeStr: "/mrv/store-exchanges/reason",
  }),
  replacements: navNode({
    keyStr: "replacements",
    titleStr: "Replacements",
    breadcrumb: true,
    routeStr: "/mrv/store-exchanges/replacements",
  }),
  review: navNode({
    keyStr: "review",
    titleStr: "Review",
    breadcrumb: true,
    routeStr: "/mrv/store-exchanges/review",
  }),
};

const baseStateSTRX = () => {
  // the basic state for Exchanges app.  Will need whenever we full-reset the app.
  return baseReturnState({ oNavNodes: defaultNavNodesSTRX });
};

export {
  baseStateSTRX,
};
