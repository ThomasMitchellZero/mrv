

//---- Product ----

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

// factory function that produces the default Retun state object

const baseReturnState = ({
  returnItems = [],
  totalReturnValue = new moneyObj({}),
  atomizedReturnItems = [],
  replacementItems = [],
  totalReplacementValue = new moneyObj({}),
  cashDeltaMO = new moneyObj({}),
  sessionInvos = {},
  oNavNodes = {},
}) => {
  return {
    returnItems,
    atomizedReturnItems,
    totalReturnValue,
    replacementItems,
    totalReplacementValue,
    cashDeltaMO,

    sessionInvos,
    oNavNodes,
  };
};

// refactor baseReturnState to use a constructor for me.  I want to be able to use the same object in multiple places.

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
  breadcrumb = false,  //may need to conditionally add a breadcrumb to the nav bar
}) => {
  return { keyStr, routeStr, titleStr, selected, disabled, breadcrumb };
};

export { baseReturnState, returnAtom, navNode };
