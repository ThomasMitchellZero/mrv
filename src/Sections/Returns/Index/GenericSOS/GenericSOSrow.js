import classes from "./GenericSOSrow.module.css";

import ProductContext from "../../../../store/product-context";

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

  //TO DO: Needs to get product description during creation in AddInvoice30;
  return (
    <tr id={itemNum} className={`${classes.container}`}>
      <td>{description}</td>
      <td>{invoProductData.delivery}</td>
      <td>{invoProductData.price}</td>
      <td>
        <div className={`${classes.fieldContainer}`}>
          <input
            className={`base_input ${classes.inputField}`}
            type={"number"}
            value={productInState.quantity}
            onChange={(event) => changeFunc(event, itemNum, maxVal)}
          />
          <p>{`/ ${maxVal}`}</p>
        </div>
      </td>
    </tr>
  );
};

export default GenericSOSrow;
