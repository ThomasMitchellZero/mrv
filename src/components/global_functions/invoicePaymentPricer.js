

/*

  BBB: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 1, 22),
      payment: {
        check: {
          paid: 0,
          routing: "12341234",
          account: "43214321",
        },
        creditCard: {
          paid: 0,
          ccNum: "1111222211112222",
        },
      },
    },
    products: {
      200: { quantity: 8, price: 44.0, tax: 4.1 },
      900: { quantity: 1, price: 987.15, tax: 91.0 },
    },
  },
*/

// populates all invoices with a total price and auto-apportions that $ to the different tenders because I am not mathing this shit by hand.

const invoicePaymentPricer = (invoiceObj) => {
  for (const thisInvo of Object.keys(invoiceObj)) {
    let totalPaid = 0;
    
    for (const thisProduct of Object.values(invoiceObj[thisInvo].products)) {

      const thisItemCost = thisProduct.quantity * thisProduct.price;
      totalPaid += thisItemCost;
    }

    // Store the total paid in the Invoice Details.
    invoiceObj[thisInvo].invoiceDetails.totalPaid = totalPaid;
    invoiceObj[thisInvo].invoiceDetails.displayPrice = `$ ${(
      totalPaid / 100
    ).toFixed(2)}`;

    //∞∞∞∞∞∞∞∞ end of loop through invoice items ∞∞∞∞∞∞∞∞∞∞∞∞∞∞

    const paymentKeyArr = Object.keys(
      invoiceObj[thisInvo].invoiceDetails.payment
    );
    let paymentTypeQty = paymentKeyArr.length;

    for (const thisPaymentType of paymentKeyArr) {
      // For ease of understanding, I don't want each payment to be identical.
      const thisPaymentTypeAmount = Math.floor(totalPaid / paymentTypeQty ** 2);

      // remove from total and decrement remaining qty.
      totalPaid -= thisPaymentTypeAmount;
      paymentTypeQty--;

      invoiceObj[thisInvo].invoiceDetails.payment[thisPaymentType].paid =
        thisPaymentTypeAmount;
    } //∞∞∞∞∞∞∞∞ end of loop through payment types ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
  } //∞∞∞∞∞∞∞∞ end of loop through Invoices ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
};

export default invoicePaymentPricer;
