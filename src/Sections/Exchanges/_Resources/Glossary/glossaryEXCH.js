// Nav Terms /////////////////////////////
const nav_SelectItems = {
  itemInputList: "itemInputList",
};

export { nav_SelectItems };
// end Nav Terms

// Active Panels ////

const actPan = {
  selectItems: {
    invoItemsTable: {
      k: "invoItemsTable",
    },
  },
};

export { actPan };


// end Active Panels

const defaultExchState = {
  activePanels: {
    left: "",
    main: "",
    right: "",
    mainCSSclass: "",
  },
  activeOrder: "ERROR - No Order",
  activeInvoice: null,
  invoiceProducts: {},
  exchProducts: new Map(),
  ptState: {
    activeNode: "",
    ptNodes: [
      { key: "chooseitems", title: "Select Items" },
      { key: "exchreason", title: "Reason For Exchange" },
      { key: "whichforwhat", title: "Set Up Exchange" },
      { key: "schedule", title: "Pickup / Delivery" },
    ],
  },
};

export { defaultExchState };
