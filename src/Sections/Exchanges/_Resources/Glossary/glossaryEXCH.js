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

// Date arrays

const weekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export { weekdayArr, monthArr };

// default Exch State

const setDefaultValues = (fastMode = false) => {
  const actualValues = {
    dfExchQty: null,
  };
  const fastValues = {
    dfExchQty: 1,
  };

  return fastMode ? fastValues : actualValues;
};

const defaultExchState = {
  activePanels: {
    left: "",
    main: "",
    right: "",
    mainCSSclass: "",
  },
  defaultValues: setDefaultValues(true),
  activeOrder: "ERROR - No Order",
  activeInvoice: null,
  invoiceProducts: {},
  exchProducts: new Map(),
  ptState: {
    activeNode: "",
    ptNodes: [
      { key: "chooseitems", title: "Select Items" },
      { key: "exchreason", title: "Reason" },
      { key: "whichforwhat", title: "Replacements" },
      { key: "schedule", title: "Schedule Time" },
      { key: "totalreview", title: "Total Review" },
    ],
  },
};

export { defaultExchState };

// Term names for different sale records.

class SalesRecord {
  constructor({ key, string }) {
    this.k = key;
    this.str = string;
  }
}

const saleRecordTypes = {
  order: new SalesRecord({ k: "order", str: "Order" }),
  invoice: new SalesRecord({ k: "order", str: "Invoice" }),
};

export { saleRecordTypes };
