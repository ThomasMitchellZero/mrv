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
    dvPickupQty: null,
    dvReturnReason: null,
  };
  const fastValues = {
    dvExchQty: 1,
    dvPickupQty: 1,
    dvReturnReason: "Doesn't Work",
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
  defaultValues: setDefaultValues(false),
  activeSaleRecord: null,
  itemsInExch:{},
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
