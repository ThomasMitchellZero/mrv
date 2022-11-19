import classes from "./SessionInvoices70.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import StartScanning from "../Index/StartScanning70";
import Table from "../../../components/UI/Table";

const SessionInvoices70 = ({ returnsContext, dispatchActivePanels }) => {
  const ctxInvoices = returnsContext.session.invoices;

  const invoiceArray = Object.entries(ctxInvoices).reverse();

  const handleDelete = (event) => {
    const origin = event.target;
    console.log(origin.id)
  };

  /*
  
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      payment: cash,
    },
    products: {
      100: { quantity: 8, price: 44.15 },
      300: { quantity: 2, price: 24.15 },
      400: { quantity: 10, price: 13.15 },
    },
  },
  
  */

  // Array containing info to make the table header
  const headingList = [
    { id: "Sale Date", active: false, descending: true, flexing: "auto" },
    { id: "Invoice #", active: false, descending: true, flexing: "auto" },
    { id: "Store #", active: false, descending: true, flexing: "auto" },
    { id: "Line Items", active: false, descending: true, flexing: "auto" },
    { id: "Total", active: false, descending: true, flexing: "auto" },
  ];

  /*
  
  AAA: {
    invoiceDetails: {
      store: 1234,
      date: new Date(2022, 8, 13),
      payment: cash,
    },
    products: {
      100: { quantity: 8, price: 44.15 },
      300: { quantity: 2, price: 24.15 },
      400: { quantity: 10, price: 13.15 },
    },
  },
  
  */

  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

//// CREATES JSX ARRAY FOR THE INVOICE TABLE ////
  const tableBodyContents = invoiceArray.map((item) => {

    // readies the content for each <td>
    const itemKey = item[0];
    const itemDetails = item[1].invoiceDetails;
    const productList = Object.values(item[1].products);
    const lineItemQty = productList.length;
    let totalPrice = 0;

    productList.forEach((product) => {
      totalPrice += product.quantity * product.price;
    });

    return (
      <tr key={itemKey}>
        <td>{itemDetails.date.toLocaleDateString("en-US", dateOptions)}</td>
        <td>{itemKey}</td>
        <td>{itemDetails.store}</td>
        <td>{lineItemQty}</td>
        <td>{totalPrice.toFixed(2)}</td>
        <td>
          <button id={itemKey} onClick={handleDelete}>
            X
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section className={classes.container}>
      <TitleBar>Scanned Invoices</TitleBar>
      <section className={classes.mainContent}>
        <div className={classes.tableWindow}>
          <p>Receipt List (coming soon)</p>
          <Table
            tableHeadingArray={headingList}
            tableBodyArray={tableBodyContents}
            hasItemAction={true}
          ></Table>
        </div>
      </section>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default SessionInvoices70;

/*

  return invoiceArray.length === 0 ? (
    <StartScanning />
  ) : (
    <section className={classes.container}>
      <TitleBar>Scanned Invoices</TitleBar>
      <section className={classes.mainContent}>
        <div className={classes.tableWindow}>
        <p>Receipt List (coming soon)</p>
      <Table
        tableHeadingArray={headingList}
        tableBodyArray={tableBodyContents}
        hasItemAction={true}
      ></Table>

        </div>
      </section>
      <FooterContainer></FooterContainer>
    </section>
  );


*/
