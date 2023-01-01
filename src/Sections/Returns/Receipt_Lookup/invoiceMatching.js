
import InvoiceContext from "../../../store/invoice-context";

import { useContext } from "react";

const InvoiceMatching = (searchObj = {}) => {

    const invoiceContext = useContext(InvoiceContext);

    console.log(invoiceContext.AAA)
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
    
*/

  const searchRoutes = {
    creditCard: {},
    phone: {},
    order: {},
    proID: {},
    commercialAcct: {},
  };

  const SO = searchObj;
  // For each invoice
  // if invoice isn't already in the list
  // for each unmatched item,
  // if matchingFunc(thisInvoice)
  // add invoice to session

  console.log(searchObj);
};

export default InvoiceMatching;
