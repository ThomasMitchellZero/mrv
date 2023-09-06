const salesRecord = ({ k, str }) => {
  return { k, str };
};

const saleRecordTypes = {
  order: salesRecord({ k: "order", str: "Order" }),
  invoice: salesRecord({ k: "invoice", str: "Invoice" }),
};

export { saleRecordTypes };



class InvoProduct {
  constructor({
    qtySold = 1,
    salePrice = 100,
    saleTax = 10,
    childItemsObj = {},
  }) {
    this.quantity = qtySold;
    this.price = salePrice;
    this.tax = saleTax;
    this.childItemsObj = childItemsObj
  }
}

class Invoice_SR {
  constructor({
    store = "1234",
    date = Date,
    pmntTypes = {}, 
    soldProducts={}

  }) {
    this.store = store;
    this.date = date;
    this.payment = pmntTypes;
    this.products = soldProducts;

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
