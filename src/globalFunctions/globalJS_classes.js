

const salesRecord = ({ k, str }) => {
    return { k, str };
  };
  
  const saleRecordTypes = {
    order: salesRecord({ k: "order", str: "Order" }),
    invoice: salesRecord({ k: "invoice", str: "Invoice" }),
  };
  
  export { saleRecordTypes };


class Order {
    constructor({
      invoice = "",
      email = "",
      street = "",
      city = "",
      state = "",
      zip = "",
      instructions="",
    }) {
      this.salesRecordType = saleRecordTypes.order.k;
      this.instructions = instructions;
      this.invoice = invoice;
      this.contact = {
        email: email,
      }
      this.deliveryAddress = {
        street: street,
        city: city,
        state: state,
        zip: zip
      }
      
    }
  }

export {Order}