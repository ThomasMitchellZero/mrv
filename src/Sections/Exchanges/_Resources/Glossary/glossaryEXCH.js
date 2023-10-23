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

const setDefaultValues = ({ fastMode = false }) => {
  const actualValues = {
    dvExchQty: "",
    dvPickupQty: "",
    dvReturnReason: null,
    dvScheduledTime: null,
  };
  const fastValues = {
    dvExchQty: 1,
    dvPickupQty: 1,
    dvReturnReason: "Doesn't Work",
    // turn this into a class or factory function since times are re-used and depend on format.
    dvScheduledTime: {
      month: "Apr",
      wkday: "Mon",
      date: 3,
      timeSlot: "8-11 am",
      dayTextString: "Mon,  Apr  3",
      timeTxtStr: "Mon,  Apr  3  :  8-11 am",
    },
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
  allSwapGroups:[],
  defaultValues: setDefaultValues({ fastMode: false }),
  activeSaleRecord: null,
  ptState: {
    activeNode: "",
    ptNodes: [
      { key: "chooseitems", title: "Select Items" },
      { key: "exchreason", title: "Reason" },
      { key: "whichforwhat", title: "Replacements" },
      { key: "schedule", title: "Schedule" },
      { key: "totalreview", title: "Review" },
    ],
  },
};

export { defaultExchState };

// Term names for different sale records.
