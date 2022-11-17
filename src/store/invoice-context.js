import React from "react";

const InvoiceContext = React.createContext({
  AAA: {
    invoiceDetails: {
      store: 1234,
    },
  },
});

export default InvoiceContext;