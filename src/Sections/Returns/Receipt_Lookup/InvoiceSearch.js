import InvoiceContext from "../../../store/invoice-context";

const InvoiceSearch = (
  invoiceContext = {},
  returnsContext = {},
  searchType = "",
  searchInput = ""
) => {
  const storeInvos = invoiceContext;
  const unmatched = returnsContext.session.unmatched;

  const sessionDispatch = returnsContext.dispatchSession;

  console.log(searchInput);

  // Each invoice is only evaluated once, so there won't be any repeats
  let outputInvoArr = [];

  // loop through all the invoices.
  for (const thisInvo of Object.keys(storeInvos)) {
    // InvoObj shortcuts
    const iInvo = storeInvos[thisInvo];
    const iInvoDetails = iInvo.invoiceDetails;
    const paymentRoute = iInvoDetails.payment?.[searchInput];

    // all potential search types.
    const searchRoutes = {
      creditCard: paymentRoute?.ccNum ?? paymentRoute?.debitNum,
      phone: iInvoDetails?.phone,
      orderNum: iInvoDetails?.orderNum,
      proIdNum: iInvoDetails?.proIdNum,
      lcaNum: iInvoDetails?.lcaNum,
    };

    const x = searchRoutes[searchType];
    const y = searchInput;
    const z = searchRoutes[searchType] !== searchInput;

    if (searchRoutes[searchType] !== searchInput) {
      continue;
    }

    // loop through unmatchedItems because we don't want to match invoices that
    for (const thisUMitem of Object.keys(unmatched)) {
      if (iInvo.products?.[thisUMitem]) {
        //If ANY matches are found, that invoice goes into the list, and if it contains multiple unmatched items, that gets handled in the matchmaker.
        outputInvoArr.push(thisInvo);
        break;
      }
    }
  }

  sessionDispatch({ type: "ADD_INVOICE", payload: outputInvoArr });

  return outputInvoArr;
};

export default InvoiceSearch;

/*
    
FFF: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 3, 8),
      payment: { cash: { paid: 0 } },
      orderNum: 11112222,
      lcaNum: 11112222,
      proIdNum: 11112222,
    },

    products: {
      100: { quantity: 10, price: 8.15, tax: 0.8 },
      300: { quantity: 8, price: 25.55, tax: 2.1 },
      400: { quantity: 1, price: 1021.05, tax: 98.21 },
    },
  },

          creditCard: {
          paid: 0,
          ccNum: 3333444433334444,
        },
    
*/

/*




*/
