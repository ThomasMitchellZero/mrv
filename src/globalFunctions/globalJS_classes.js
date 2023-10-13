//---- Product ----

/*

  900: {
    img: topload_washer_img,
    price: 88000,
    itemNum: "900",
    modelNum: "STL301",
    description: "Samsung 7.1-cu ft Reversible Side Load Washer",
    categories: ["Stock","Delivery"],
    specialCategories: {SOS:true},
    restockFee: 0.2,
    inStock: 99,
    dcLocations:["AAA"],
  },

*/

class Product {
  constructor({
    img = "",
    price = 1,
    itemNum = "1",
    modelNum = "1",
    description = "",
    categories = {}, // I changed this
    specialCategories = {},
    reqAccessories = {},
    restockFee = null,
    inStock = 99,
    dcLocations = {},
    cat,
  }) {
    this.img = img;
    this.price = price;
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
  service = false,
  LPP_3yr = false,
  LPP_5yr = false,
  accessory = false,
}) => {
  const classStr = mainItem
    ? "mainItem"
    : service
    ? "service"
    : LPP_3yr
    ? "LPP_3yr"
    : LPP_5yr
    ? "LPP_5yr"
    : accessory
    ? "Accessory"
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
  }) {
    this.quantity = quantity;
    this.price = price;
    this.tax = tax;
    this.childItemsObj = childItemsObj;
    this.prodClass = prodClass;
  }
}

/*

*/

class Invoice_SR {
  constructor({ store = "1234", date = Date, payment = {}, products = {} }) {
    this.invoiceDetails = { store: store, date: date, payment: payment };

    this.products = products;
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
