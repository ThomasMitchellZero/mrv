import classes from "./SessionItems70.module.css";

import StartScanning from "../Index/StartScanning70";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import ReturnsProductDetail from "./ReturnsProductDetails";
import Table from "../../../components/UI/Table";
import RefundTotal from "../../../components/UI/RefundTotal";

const SessionItems70 = ({ returnsContext, dispatchActivePanels }) => {
  // items are stored in an object.  This makes an array so they can be iterated.

  const ctxItems = Object.values(returnsContext.session.items).reverse();

  const dispatchSession = returnsContext.dispatchSession;

  const headingList = [
    { id: "Invoice", active: false, descending: true, width: "8%" },
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
        restockFee: 0.2,
      },
  */

  const tableBodyContents = ctxItems.map((line) => {
    const price = Number(line.price).toFixed(2);
    const quantity = Number(line.quantity);
    const total = (price * quantity).toFixed(2);

    // if there is a restock fee, display it and apply voidPrice to h4
    const adjPrice = line.restockFee ? (
      <section className={classes.tdStacker}>
        <h4 className={classes.voidPrice}>{`$${price}`}</h4>
        <p className="warning-text">
          {`$-${(price * line.restockFee).toFixed(2)}`}{" "}
        </p>
      </section>
    ) : (
      <h4>{`$${price}`}</h4>
    );

    // if there is a restock fee, display the % below the total cost.
    const totalCost = (
      <section className={classes.tdStacker}>
        <h4>{`$${total}`}</h4>
        {line.restockFee ? (
          <p className="warning-text">{`Restocking fee: ${
            100 * line.restockFee
          }%`}</p>
        ) : null}
      </section>
    );

    return (
      <tr
        key={line.itemNum}
        onClick={() => {
          dispatchActivePanels({
            type: "SET_PANELS",
            payload: { set30: "item_details", details: line.itemNum },
          });
        }}
      >
        <td>{`- -`}</td>
        <td>
          <ReturnsProductDetail productData={line} />
        </td>

        <td>{adjPrice}</td>
        <td>
          <div className="number-bubble"> {quantity}</div>
        </td>
        <td>{totalCost}</td>
        <td>{`- -`}</td>
        <td>
          <button
            id={line.itemNum}
            onClick={(event) => {
              dispatchSession({
                type: "REMOVE_ITEM",
                payload: line.itemNum,
              });
              /* Each <tr> is clickable, and contains a clickable Delete button.  event.stopPropagation() keeps the <tr> click event from executing after Delete is clicked.*/
              event.stopPropagation();
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
      <FooterContainer>
        <RefundTotal
          dataObj={returnsContext.session.matched}
          hideAdjust={false}
        />
      </FooterContainer>
    </section>
  );
};

export default SessionItems70;

/*




*/
