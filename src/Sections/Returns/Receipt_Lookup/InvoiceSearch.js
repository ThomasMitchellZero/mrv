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
  let outputInvoArr = []

  // loop through all the invoices
  for (const thisInvo of Object.keys(storeInvos)) {
    // InvoObj shortcuts
    const iInvo = storeInvos[thisInvo];
    const iInvoDetails = iInvo.invoiceDetails;

    // loop through unmatchedItems
    for (const thisUMitem of Object.keys(unmatched)) {

      //
      const searchRoutes = {
        creditCard: iInvoDetails.payment?.creditCard?.ccNum,
        phone: iInvoDetails?.phone,
        orderNum: iInvoDetails?.orderNum,
        proID: iInvoDetails?.proID,
        lcaNum: iInvoDetails?.lcaNum,
      };

      const hasItem = iInvo.products?.[thisUMitem] ?? false
      const hasSearchMatch =  searchRoutes[searchType] === searchInput

      const shouldAdd = hasItem && hasSearchMatch

      if (
        shouldAdd
      ) {
        outputInvoArr.push(thisInvo)
        //I think we can break here.  If ANY matches are found, that invoice goes into the list, and if it contains multiple unmatched items, that gets handled in the matchmaker.
        break

      }
    }
  }

  sessionDispatch({type: "ADD_INVOICE", payload: outputInvoArr })

  return outputInvoArr;



  // For each invoice
  // if invoice isn't already in the list.  Or maybe I don't need?  If I overwrite an invoice that's already on the list I don't think anything bad happens because there's no quantity and every instance of the invoice is identical?
  // for each unmatched item,
  // if matchingFunc(thisInvoice)
  // add invoice to session
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
