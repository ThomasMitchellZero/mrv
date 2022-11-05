import classes from "./SessionInvoices70.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import StartScanning from "../Index/StartScanning70";
import Table from "../../../components/UI/Table";

const SessionInvoices70 = ({returnsContext, dispatchActivePanels}) => {

  const ctxInvoices = returnsContext.session.invoices;

  const handleHeadingClick = (event) => {
    const origin = event.target;
    console.log(origin);
  };


  // Array containing info to make the table header
  const headingList = [
    { id: "Sale Date", active: false, descending: true, flexing: "auto" },
    { id: "Invoice #", active: false, descending: true, flexing: "auto" },
    { id: "Store #", active: false, descending: true, flexing: "auto" },
    { id: "Line Items", active: false, descending: true, flexing: "auto" },
    { id: "Total", active: false, descending: true, flexing: "auto" },
  ];


  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

  const tableBodyContents = ctxInvoices.map((item) => {
    return (
      <tr key={item.invoice}>
        <td>{item.saleDate.toLocaleDateString("en-US", dateOptions)}</td>
        <td>{item.invoice}</td>
        <td>{item.store}</td>
        <td>{item.lineItems}</td>
        <td>{item.total}</td>
        <td>x</td>
      </tr>
    );
  });


  return ctxInvoices.length <= 0 ? (
    <StartScanning />
  ) : (
    <section className={classes.container}>
      <TitleBar>Scanned Items</TitleBar>
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
