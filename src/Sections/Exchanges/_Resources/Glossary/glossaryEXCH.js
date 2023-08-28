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
    dvExchQty: null,
  };
  const fastValues = {
    dvExchQty: 1,
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
  activeSaleRecord: null,
  invoiceProducts: {},
  itemsInExch:{},
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

const salesRecord = ({ k, str }) => {
  return { k, str };
};

const saleRecordTypes = {
  order: salesRecord({ k: "order", str: "Order" }),
  invoice: salesRecord({ k: "invoice", str: "Invoice" }),
};

export { saleRecordTypes };
