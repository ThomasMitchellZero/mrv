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

// CSS Terms /////////////////////////////

// end CSS Terms

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
  sessionItems: new Map(),
  ptState: {
    activeNode: 0,
    ptNodes: [
      { title: "Select Items" },
      { title: "Reason For Exchange" },
      { title: "Set Up Exchange" },
      { title: "Pickup / Delivery" }
    ],
  },
};

export { defaultExchState };
