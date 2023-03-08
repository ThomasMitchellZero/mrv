import classes from "./SessionInvoices70.module.css";

import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import StartScanning from "../Index/StartScanning70";
import Table from "../../../components/UI/Table/Table";
import RefundTotal from "../../../components/UI/DisplayOutputs/RefundTotal";

const SessionInvoices70 = ({ returnsContext, dispatchActivePanels }) => {
  const ctxInvoices = returnsContext.session.invoices;
  const dispatchSession = returnsContext.dispatchSession;

  const invoiceArray = Object.entries(ctxInvoices).reverse();

  // Array containing info to populate the table header
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

  //// CREATES JSX ARRAY FOR THE INVOICE TABLE ////
  const tableBodyContents = invoiceArray.map((thisInvoice) => {
    // vars containing the content for each <td>
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

    const itemKey = thisInvoice[0];
    const invoDetails = thisInvoice[1].invoiceDetails;
    const productList = Object.values(thisInvoice[1].products);
    const lineItemQty = productList.length;
    let displayPrice = invoDetails.displayPrice

    return (
      <tr className="divider-bottom" key={itemKey}>
        <td>{invoDetails.date.toLocaleDateString("en-US", dateOptions)}</td>
        <td>{itemKey}</td>
        <td>{invoDetails.store}</td>
        <td>{lineItemQty}</td>
        <td>{displayPrice}</td>
        <td>
          <button
            id={itemKey}
            onClick={() =>
              dispatchSession({
                type: "REMOVE_INVOICE",
                payload: itemKey,
              })
            }
          >
            X
          </button>
        </td>
      </tr>
    );
  });

  return invoiceArray.length === 0 ? (
    <StartScanning moneyObj={returnsContext.session.refund_money}/>
  ) : (
    <section className={classes.container}>
      <TitleBar>Scanned Invoices</TitleBar>
      <section className={classes.mainContent}>

          <p>Receipt List (coming soon)</p>
          <Table
            tableHeadingArray={headingList}
            tableBodyArray={tableBodyContents}
            hasItemAction={true}
            scrollOnOverflow={true}
          ></Table>

      </section>
      <FooterContainer>
        <RefundTotal dataObj={returnsContext.session.refund_money} />
      </FooterContainer>
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
