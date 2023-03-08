import classes from "./GenericSOSrow.module.css";

import ProductContext from "../../../../store/product-context";
import MessageRibbon from "../../../../components/UI/DisplayOutputs/MessageRibbon";

import { useContext } from "react";

const GenericSOSrow = ({
  itemNum = 0,
  invoiceProductData,
  productInState,
  changeFunc,
}) => {
  const description = useContext(ProductContext)?.[itemNum].description ?? "";
  const invoProductData = { ...invoiceProductData };
  const maxVal = invoProductData.quantity;
  const deliveryStatus = invoProductData.delivery;

  const deliveryStatusObj = {
    due: {
      color: "gold",
      text: "Due",
      size: "small",
      width: "auto",
    },
    delivered: {
      color: "green",
      text: "Delivered",
      size: "small",
      width: "auto",
    },
  };

  // if the item is still due...
  const inputField =
    deliveryStatus === "due" ? (
      "Cancel in Orders" // tell user to do it in Orders
    ) : (
      // else, give them the input field
      <div className={`${classes.fieldContainer}`}>
        <input
          className={`base_input ${classes.inputField}`}
          type={"number"}
          value={productInState.quantity}
          onChange={(event) => changeFunc(event, itemNum, maxVal)}
        />
        <h4>{`/ ${maxVal}`}</h4>
      </div>
    );

  //TO DO: Needs to get product description during creation in AddInvoice30;
  return (
    <tr id={itemNum} className={`${classes.container}`}>
      <td className={`${classes.describe}`}>{description}</td>
      <td>
        <MessageRibbon {...deliveryStatusObj[deliveryStatus]} />
      </td>
      <td> {`$ ${(invoProductData.price / 100).toFixed(2)}`}</td>
      <td>{inputField}</td>
    </tr>
  );
};

export default GenericSOSrow;
