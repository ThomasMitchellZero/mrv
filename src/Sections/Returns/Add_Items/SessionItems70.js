import classes from "./SessionItems70.module.css";

import StartScanning from "../Index/StartScanning70";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import ReturnsProductDetail from "./ReturnsProductDetails";
import Table from "../../../components/UI/Table";

const SessionItems70 = ({ returnsContext, dispatchActivePanels }) => {
  // items are stored in an object.  This makes an array so they can be iterated.

  const ctxItems = Object.values(returnsContext.session.items).reverse();

  const dispatchSession = returnsContext.dispatchSession;

  const headingList = [
    { id: "Invoice #", active: false, descending: true, width: "10%" },
    { id: "Product Details", active: false, descending: true, width: "35%" },
    { id: "Unit $", active: false, descending: true, width: "10%" },
    { id: "Qty", active: false, descending: true, width: "8%" },
    { id: "Total $", active: false, descending: true, width: "12%" },
    { id: "Decline Code", active: false, descending: true, width: "auto" },
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
  const tableBodyContents = ctxItems.map((line) => {
    const price = Number(line.price);
    const quantity = Number(line.quantity);
    const total = (price * quantity).toFixed(2);

    const handleClick = (number) => {
      console.log(number);
    };

    // Each <tr> is clickable, and contains a clickable Delete button.  event.stopPropagation() keeps the <tr> click event from executing after Delete is clicked.
    return (
      <tr key={line.itemNum} onClick={() => handleClick(line.itemNum)}>
        <td>{`- -`}</td>
        <td>
          <ReturnsProductDetail productData={line} />
        </td>

        <td className={classes.cost}>{`$ ${price}`}</td>
        <td>
          <div className="number_bubble"> {quantity}</div>
        </td>
        <td className={classes.cost}>{`$ ${total}`}</td>
        <td>{`- -`}</td>
        <td>
          <button
            id={line.itemNum}
            onClick={(event) => {
              dispatchSession({
                type: "REMOVE_ITEM",
                payload: line.itemNum,
              });
              event.stopPropagation()
            }}
          >
            X
          </button>
        </td>
      </tr>
    );
  });

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




*/
