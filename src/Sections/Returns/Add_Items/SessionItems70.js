import classes from "./SessionItems70.module.css";

import StartScanning from "../Index/StartScanning70";
import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import ReturnsProductDetail from "./ReturnsProductDetails";
import Table from "../../../components/UI/Table/Table";
import RefundTotal from "../../../components/UI/DisplayOutputs/RefundTotal";

const SessionItems70 = ({
  returnsContext,
  sessionContext,
  dispatchActivePanels,
  activeItem,
}) => {
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

  const handleClick = (line) => {
    // condition for user testing, de-activates item clicking for test.
    if (sessionContext.state30 !== "multi_reason_100") {
      dispatchActivePanels({
        type: "SET_PANELS",
        payload: { set30: "item_details", activeItem: line.itemNum },
      });
    }
  };

  const tableBodyContents = ctxItems.map((line) => {
    const price = Number(line.price / 100).toFixed(2);
    const quantity = Number(line.quantity);
    const total = (price * quantity).toFixed(2);
    const isActive = activeItem === line.itemNum ? "activeTR" : "";

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
        className={`divider-bottom `}
        key={line.itemNum}
        onClick={() => {
          handleClick(line);
        }}
      >
        <td className={`activeStatusBar ${isActive}`}></td>
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
              dispatchActivePanels({
                type: "SET_PANELS",
                payload: { set30: "item_entry" },
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
    <StartScanning moneyObj={returnsContext.session.refund_money} />
  ) : (
    <section className={classes.container}>
      <TitleBar>Scanned Items</TitleBar>
      <section className={classes.mainContent}>
        <p>Receipt List (coming soon)</p>
        <Table
          tableHeadingArray={headingList}
          tableBodyArray={tableBodyContents}
          hasItemAction={true}
          hasActiveIndicator={true}
        ></Table>
      </section>
      <FooterContainer>
        <RefundTotal
          dataObj={returnsContext.session.refund_money}
          hideAdjust={false}
        />
      </FooterContainer>
    </section>
  );
};

export default SessionItems70;

/*




*/
