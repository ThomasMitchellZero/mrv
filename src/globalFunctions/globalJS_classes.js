//---- Product ----

import cloneDeep from "lodash.clonedeep";

class moneyObj {
  constructor({ unitBaseValue = 0, salesTax = 0, salesTaxRate = 0.09 }) {
    this.unitBaseValue = unitBaseValue;
    this.salesTaxRate = salesTaxRate;
    this.salesTax = salesTax || this.calcSalesTax();
  }

  // If I want to auto-calculate sales tax, I can set this.salesTax to 0.
  calcSalesTax() {
    const outSalesTax = Math.round(this.subTotal * this.salesTaxRate);
    return outSalesTax;
  }

  // derived values are never modified directly so they are provided as getters.
  get subTotal() {
    return this.unitBaseValue;
  }
  get unitTotal() {
    return this.subTotal + this.salesTax || 0;
  }
}

export { moneyObj };

class SingleDispo {

  // keys don't match values, refactor this.
  constructor({
    keyStr,
    isResellable = true,
    isDamaged = false,
    isChosen = false,
    dispoQty = 0,
    strLabel = "NO LABEL",
  }) {
    this.keyStr = keyStr;
    this.strLabel = strLabel;
    this.isDamaged = isDamaged;
    this.dispoQty = dispoQty;
    this.isChosen = isChosen;
  }
}

class ItemDisposObj {
  constructor({
    dispoItemNum,
    itemQty,
    dispoItemAtom = new returnAtom({}),
    allDisposObj = {},
  }) {
    this.dispoItemNum = dispoItemNum;
    this.itemQty = itemQty;
    this.dispoItemAtom = dispoItemAtom;
    this.allDisposObj = allDisposObj;
  }
  get qtySansDispo() {
    const refSingleDispo = new SingleDispo({});
    const aAllDispos = Object.values(cloneDeep(this.allDisposObj));

    let outQtySansDispo = this.itemQty;
    aAllDispos.forEach((iDispo) => {
      const minusQty = iDispo?.dispoQty || 0;
      outQtySansDispo -= minusQty;
    });
    return outQtySansDispo;
  }
}

export { SingleDispo, ItemDisposObj };

class Product {
  constructor({
    img = "",
    price = 0,
    itemNum = "1",
    modelNum = "1",
    description = "",
    categories = {}, // I changed this
    specialCategories = {},
    reqAccessories = null,
    restockFee = null,
    inStock = 99,
    dcLocations = {},
  }) {
    this.img = img;
    this.price = price;
    this.tax = Math.round(price / 11);
    this.itemNum = itemNum;
    this.modelNum = modelNum;
    this.description = description;
    this.categories = categories;
    this.specialCategories = specialCategories;
    this.reqAccessories = reqAccessories;
    this.restockFee = restockFee;
    this.inStock = inStock;
    this.dcLocations = dcLocations;
  }
}

const ProdClass = ({
  mainItem = false,
  accessory = false,
  lpp_3yr = false,
  lpp_5yr = false,
  service = false,
}) => {
  const classStr = mainItem
    ? "mainItem"
    : accessory
    ? "accessory"
    : lpp_3yr
    ? "lpp_3yr"
    : lpp_5yr
    ? "lpp_5yr"
    : service
    ? "service"
    : null;

  return classStr;
};

export { Product, ProdClass };

//---- Sales Record ----

const salesRecord = ({ k, str }) => {
  return { k, str };
};

const saleRecordTypes = {
  order: salesRecord({ k: "order", str: "Order" }),
  invoice: salesRecord({ k: "invoice", str: "Invoice" }),
};

export { saleRecordTypes };

//---- Orders ----

class InvoProduct {
  constructor({
    quantity = 1,
    price = 100,
    tax = 10,
    childItemsObj = {},
    prodClass = "",
    moneyObj = {},
  }) {
    this.quantity = quantity;
    this.price = price;
    this.tax = tax;
    this.childItemsObj = childItemsObj;
    this.prodClass = prodClass;
    this.moneyObj = moneyObj;
  }
}

/*

*/

class Invoice_SR {
  constructor({
    invoNum = "FART",
    store = "1234",
    date = new Date(2022, 1, 22),
    payment = {},
    products = {},
    itemAtomsArr = [],
    symbolsArr = [],
  }) {
    this.invoNum = invoNum;
    this.invoiceDetails = {
      store: store,
      date: date,
      payment: payment,
    };
    this.store = store;
    this.date = date;
    this.payment = payment;
    this.dateStr = date.toLocaleDateString("us-EN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    this.products = products;
    this.symbolsArr = symbolsArr;

    if (itemAtomsArr.length) {
      this.itemAtomsArr = itemAtomsArr.map((thisAtom) => {
        thisAtom.atomInvoNum = invoNum;
        return thisAtom;
      });
    }
  }
}

export { Invoice_SR, InvoProduct };

//---- Orders ----

class Order_SR {
  constructor({
    invoice = "",
    email = "",
    street = "",
    city = "",
    state = "",
    zip = "",
    instructions = "",
  }) {
    this.salesRecordType = saleRecordTypes.order.k;
    this.instructions = instructions;
    this.invoice = invoice;
    this.contact = {
      email: email,
    };
    this.deliveryAddress = {
      street: street,
      city: city,
      state: state,
      zip: zip,
    };
  }
}

export { Order_SR };

class sessionItem {
  constructor({ itemNum = "", itemQty = 0, disposObj = {} }) {
    this.itemNum = itemNum;
    this.itemQty = itemQty;
    this.disposObj = disposObj;
  }
}

class singleDispo {
  constructor({ isResellable = false, dispoQty = 0, strLabel = "NO LABEL" }) {
    this.strLabel = strLabel;
    this.isDamaged = isResellable;
    this.dispoQty = dispoQty;
  }
}

export { sessionItem, singleDispo };

//// Return Classes ///////////////////////////////////////////////

// factory function that produces the default Return state object

function baseLocState({
  pageActiveKey1 = "",
  pageActiveKey2 = "",
  pageActiveUI1 = "",
  pageActiveUI2 = "",
  pageActiveData1 = null,
  pageActiveData2 = null, // NEVER CLEAR THESE
  pageErrorSt1 = "",

  rPanActiveKey1 = "",
  rPanActiveKey2 = "",
  rPanActiveUI1 = "",
  rPanActiveUI2 = "",
  rPanActiveData1 = null,
  rPanActiveData2 = null,

  mainActiveKey1 = "",
  mainActiveKey2 = "",
  mainActiveUI1 = "",
  mainActiveUI2 = "",
  mainActiveData1 = null,
  mainActiveData2 = null,

  locStError1 = "",
  // NEVER CLEAR THESE
  sContextName = "",
  oClearSts = {},
  methods = {},
}) {
  const makeBaseClearSt = () => {
    // Returns a base locSt, minus the fields that must NEVER be cleared.
    // Other clear states can be added by deleting further properties in local contexts.

    // Clean up later, we're just trying to get this to work.
    const outClearSt = {
      pageActiveKey1,
      pageActiveKey2,
      pageActiveUI1,
      pageActiveUI2,
      pageActiveData1,
      pageActiveData2,
      pageErrorSt1,

      rPanActiveKey1,
      rPanActiveKey2,
      rPanActiveUI1,
      rPanActiveUI2,
      rPanActiveData1,
      rPanActiveData2,

      mainActiveKey1,
      mainActiveKey2,
      mainActiveUI1,
      mainActiveUI2,
      mainActiveData1,
      mainActiveData2,

      locStError1,

      sContextName,
      oClearSts,
      methods,
    };
    delete outClearSt.sContextName;
    delete outClearSt.oClearSts;
    delete outClearSt.methods;

    return outClearSt;
  };

  oClearSts.baseClear = makeBaseClearSt();

  return {

    pageActiveKey1,
    pageActiveKey2,
    pageActiveUI1,
    pageActiveUI2,
    pageActiveData1,
    pageActiveData2,
    pageErrorSt1,

    rPanActiveKey1,
    rPanActiveKey2,
    rPanActiveUI1,
    rPanActiveUI2,
    rPanActiveData1,
    rPanActiveData2,

    mainActiveKey1,
    mainActiveKey2,
    mainActiveUI1,
    mainActiveUI2,
    mainActiveData1,
    mainActiveData2,

    locStError1,

    sContextName,
    oClearSts,
    methods,
  };
}

const baseReturnState = ({
  sessionConfigs = {
    negativeReturnVals: true,
  },
  returnItems = [],
  totalReturnValue = new moneyObj({}),
  atomizedReturnItems = [],
  replacementItems = [],
  totalReplacementValue = new moneyObj({}),
  cashDeltaMO = new moneyObj({}),
  sessionInvos = {},
  returnItemDispos = [],
  oNavNodes = {},
  locSt = baseLocState({}),
}) => {
  return {
    returnItems,
    atomizedReturnItems,
    totalReturnValue,
    replacementItems,
    totalReplacementValue,
    cashDeltaMO,
    returnItemDispos,
    sessionInvos,
    oNavNodes,
    locSt,
  };
};

const namedArray = ({ keyStr = "", value = [] }) => {
  return { keyStr, value };
};

export { namedArray };


class returnAtom {
  // Returns object of an item + qty that are identical in EVERY property we use.  Intended to go into an array.

  constructor({
    parentKey = "",
    atomInvoNum = "",
    atomMoneyObj = null,
    atomDispoKey = "",
    atomItemNum = "",
    atomItemQty = 0,
    bifrostKey = "",
  }) {
    this.atomItemNum = atomItemNum;
    this.parentKey = parentKey;
    this.atomInvoNum = atomInvoNum;
    this.atomMoneyObj = atomMoneyObj || new moneyObj({});
    this.atomDispoKey = atomDispoKey;
    this.atomItemQty = atomItemQty;
    this.bifrostKey = bifrostKey || this.atomItemNum;
  }

  get primaryKey() {
    return `${this.atomItemNum}&${this.atomInvoNum}&${this.unitTotal}`;
  }
}

const navNode = ({
  keyStr = "",
  routeStr = "",
  titleStr = "No Title",
  selected = false,
  disabled = true,
  breadcrumb = false, //may need to conditionally add a breadcrumb to the nav bar
}) => {
  return { keyStr, routeStr, titleStr, selected, disabled, breadcrumb };
};

export { baseLocState, baseReturnState, returnAtom, navNode };
