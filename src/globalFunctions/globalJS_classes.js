//---- Product ----

/*

*/

class moneyObj {
  
  // Represents the cost or value of ONE unit.
  #salesTaxSum;
  #taxRate;

  constructor({
    unitBaseValue = 0,
    taxRate = 0.09,
    salesTaxSum = 0,
    valIncrease = 0,
    valDecrease = 0,
  }) {
    this.unitBaseValue = unitBaseValue;
    this.#taxRate = taxRate;
    this.#salesTaxSum = salesTaxSum;
    this.valIncrease = valIncrease;
    this.valDecrease = valDecrease;
  }
  // derived values are provided by getters.  moneyObj is sometimes used for cumulative totals, so these values could potentially be stale otherwise.

  get subTotal() {
    return this.unitBaseValue + this.valIncrease - this.valDecrease;
  }
  get salesTax() {
    // salesTax is automatically calculated unless the figure is explicitly provided.
    const outSalesTax =
      this.#salesTaxSum || Math.round(this.subTotal * this.#taxRate);
    return outSalesTax;
  }
  get unitTotal() {
    return this.subTotal + this.salesTax;
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
    date = Date,
    payment = {},
    products = {},
    itemAtomsArr = [],
  }) {
    this.invoNum = invoNum;
    this.invoiceDetails = { store: store, date: date, payment: payment };
    this.products = products;
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

class returnAtom {
  // Returns object of an item + qty that are identical in EVERY property we use.  Intended to go into an array.

  constructor({
    atomInvoNum = "NO_INVO",
    atomMoneyObj = {},
    atomDispoKey = "",
    atomItemNum = "",
    atomItemQty = 0,
    parentKey = "",
  }) {
    this.atomInvoNum = atomInvoNum;
    this.atomMoneyObj = atomMoneyObj;
    this.atomDispoKey = atomDispoKey;
    this.atomItemNum = atomItemNum;
    this.atomItemQty = atomItemQty;
    this.unitTotal = atomMoneyObj.unitTotal ?? "NO_TOTAL";
    this.parentKey = parentKey;

    this.vals = () => {
      return {
        atomInvoNum,
        atomMoneyObj,
        atomDispoKey,
        atomItemNum,
        atomItemQty,
      };
    };
  }

  get primaryKey() {
    return `${this.atomItemNum}&${this.atomInvoNum}&${this.unitTotal}`;
  }
}

class mrvItemAtom {
  // Returns object of an item + qty that are identical in EVERY property we use.  Intended to go into an array.

  constructor({
    atomInvoNum = "NO_INVO",
    atomMoneyObj = {},
    atomDispoKey = "",
    atomItemNum = "",
    atomItemQty = 0,
    parentKey = "",
  }) {
    this.atomInvoNum = atomInvoNum;
    this.atomMoneyObj = atomMoneyObj;
    this.atomDispoKey = atomDispoKey;
    this.atomItemNum = atomItemNum;
    this.atomItemQty = atomItemQty;
    this.unitTotal = atomMoneyObj.unitTotal ?? "NO_TOTAL";
    this.parentKey = parentKey;

    this.vals = () => {
      return {
        atomInvoNum,
        atomMoneyObj,
        atomDispoKey,
        atomItemNum,
        atomItemQty,
      };
    };
  }

  get primaryKey() {
    return `${this.atomItemNum}&${this.atomInvoNum}&${this.unitTotal}`;
  }
}

export { returnAtom, mrvItemAtom };
