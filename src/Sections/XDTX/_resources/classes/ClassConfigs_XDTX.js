import {
  baseReturnState,
  navNode,
} from "../../../../globalFunctions/globalJS_classes";

const defaultNavNodesXDTX = {
  testScenarios: navNode({
    keyStr: "testScenarios",
    titleStr: "Start",
    routeStr: "/mrv/xdt-exchanges",
  }),
  returns: navNode({
    keyStr: "returns",
    titleStr: "Returns",
    breadcrumb: true,
    routeStr: "/mrv/xdt-exchanges/return-items",
  }),
  returnReason: navNode({
    keyStr: "returnReason",
    titleStr: "Return Reason",
    breadcrumb: true,
    routeStr: "/mrv/xdt-exchanges/return-reason",
  }),
  replacementItems: navNode({
    keyStr: "replacementItems",
    titleStr: "Replacement Items",
    breadcrumb: true,
    routeStr: "/mrv/xdt-exchanges/replacement-items",
  }),
  scheduleDelivery: navNode({
    keyStr: "scheduleDelivery",
    titleStr: "Schedule Delivery",
    breadcrumb: true,
    routeStr: "/mrv/xdt-exchanges/schedule-delivery",
  }),
  totalReview: navNode({
    keyStr: "totalReview",
    titleStr: "Total Review",
    breadcrumb: true,
    routeStr: "/mrv/xdt-exchanges/total-review",
  }),
  /*

  
  */
};

const baseStateXDTX = () => {
  return baseReturnState({ oNavNodes: defaultNavNodesXDTX });
};

export { baseStateXDTX };
