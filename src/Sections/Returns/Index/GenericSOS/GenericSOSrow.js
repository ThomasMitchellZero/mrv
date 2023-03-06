import classes from "./GenericSOSrow.module.css";

import ProductContext from "../../../../store/product-context";

import { useContext } from "react";

const GenericSOSrow = ({ itemNum = 0, productDataObj }) => {
  const thisProduct = useContext(ProductContext)?.[itemNum];
  const description = thisProduct.description ?? "";
  const item = productDataObj;

  //TO DO: Needs to get product description during creation in AddInvoice30;
  return (
    <tr id={itemNum} className={`${classes.container}`}>
      <td>{description}</td>
      <td>{item.delivery}</td>
      <td>{item.price}</td>
      <td>Input TBD</td>
    </tr>
  );
};

export default GenericSOSrow;
