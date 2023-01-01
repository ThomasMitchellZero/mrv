import InvoiceContext from "../../../store/invoice-context";

const InvoiceSearch = (
  invoiceContext = {},
  returnsContext = {},
  searchType = "",
  searchInput ="",
) => {
  const storeInvos = invoiceContext
  const unmatched = returnsContext.session.invoices;

  //Calling it right now, this really might not work.  I'm not sure I can dispatch from in here because I'm using a hook in a different level of the stack.  I might need to return an array of matched invoices and then add them to the session from <Receipt Lookup>  If that is the case, I should modify ADD_INVOICE to accept an array and add them all in a batch.

  const sessionDispatch = returnsContext.dispatchSession;

  //sessionDispatch({ type: "ADD_INVOICE", payload: "AAA"})
  
  // loop through all the invoices
  for (const thisInvo of Object.keys(storeInvos)){

    // InvoObj shortcuts
    const iInvo = storeInvos[thisInvo];
    const iInvoDetails = iInvo.invoiceDetails;

    // loop through unmatchedItems
    for(const thisUMitem of Object.keys(unmatched)){

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


      const searchRoutes = {
        creditCard: iInvo.payment?.creditCard?.ccNum,
        phone: iInvoDetails?.phone,
        orderNum: iInvoDetails?.orderNum,
        proID: iInvoDetails?.proID,
        lcaNum: iInvoDetails?.lcaNum,
      };

      if(storeInvos[thisInvo].products?.[thisUMitem] && 
        true ){
        
      }



      


    }

  }







  // For each invoice
  // if invoice isn't already in the list.  Or maybe I don't need?  If I overwrite an invoice that's already on the list I don't think anything bad happens because there's no quantity and every instance of the invoice is identical?  
  // for each unmatched item,
  // if matchingFunc(thisInvoice)
  // add invoice to session



};

export default InvoiceSearch;
