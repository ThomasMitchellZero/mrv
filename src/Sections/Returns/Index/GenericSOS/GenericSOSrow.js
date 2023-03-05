import classes from "./GenericSOSrow.module.css";

const GenericSOSrow = ({ itemNum = 0, productDataObj }) => {
    
  const item = productDataObj;

  //TO DO: Needs to get product description during creation in AddInvoice30;
  return (
    <tr id={itemNum} className={`${classes.container}`}>
      <td>{item.tax}</td>
      <td>{item.delivery}</td>
      <td>{item.price}</td>
      <td>Input TBD</td>
    </tr>
  );
};

export default GenericSOSrow;
