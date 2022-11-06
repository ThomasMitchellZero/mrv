import classes from "./SessionItems70.module.css";

import StartScanning from "../Index/StartScanning70";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import ReturnsProductDetail from "../Add_Invoices/ReturnsProductDetails";
import Table from "../../../components/UI/Table";

const SessionItems70 = ({ returnsContext, dispatchActivePanels }) => {
  // items are stored in an object.  This makes an array so they can be iterated.
  const ctxItems = Object.values(returnsContext.session.items);

  const headingList = [
    { id: "Invoice #", active: false, descending: true, flexing: "auto" },
    { id: "Product Details", active: false, descending: true, flexing: "auto" },
    { id: "Unit Price", active: false, descending: true, flexing: "auto" },
    { id: "Qty", active: false, descending: true, flexing: "auto" },
    { id: "Total Price", active: false, descending: true, flexing: "auto" },
    { id: "Decline Code", active: false, descending: true, flexing: "auto" },
  ];


  /*
      400: {
        quantity: 1,
        img: toilet_img,
        price: 8.75,
        itemNum: "400",
        modelNum: "RT3301",
        description: "American Standard Grand Duke II with Ultra-Flush",
        categories: ["Stock", "Special Order"],
      },
  */

  

  // this thing is getting huge.  It be better as a component?
  const tableBodyContents = ctxItems.map((line)=>{
    const price = Number(line.productData.price) 
    const quantity = Number(line.scanDetails.quantity)
    const total = (price * quantity).toFixed(2)
    return (

      <tr key={line.scanDetails.scanID}>
        <td>{line.scanDetails.scanID}</td>
        <td>
          <ReturnsProductDetail productData={line.productData} />
        </td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>{total}</td>
        <td>
          <button
            id={line.scanDetails.scanID}
            onClick={returnsContext.handleDelete}
          >
            X
          </button>
        </td>
      </tr>
    );
  })

  return ctxItems.length <= 0 ? (
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

export default SessionItems70;

/*

  const tableContentsArr = [
    {
      saleDate: new Date(2022, 6, 13),
      invoice: 12333,
      store: 2233,
      lineItems: 2,
      total: "$123.45",
    },
    {
      saleDate: new Date(2022, 1, 19),
      invoice: 14373,
      store: 2233,
      lineItems: 4,
      total: "$420.69",
    },
  ];

  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

  const tableBodyContents = tableContentsArr.map((item) => {
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

*/
