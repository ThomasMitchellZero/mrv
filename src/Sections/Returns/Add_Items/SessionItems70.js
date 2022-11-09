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
    const price = Number(line.price) 
    const quantity = Number(line.quantity)
    const total = (price * quantity).toFixed(2)
    return (

      <tr key={line.itemNum}>
        <td>{line.itemNum}</td>
        <td>
          <ReturnsProductDetail productData={line} />
        </td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>{total}</td>
        <td>
          <button
            id={line.itemNum}
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

          <button
            id={line.itemNum}
            onClick={returnsContext.dispatchSession({
              type: "REMOVE_ITEM",
              payload: line.itemNum,
            })}
          >
            X
          </button>
*/
