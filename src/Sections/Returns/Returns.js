import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext, useState } from "react";

const Returns = () => {
  const productContext = useContext(ProductContext);

  const idGenerator = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const [cart, editCart] = useState([
    { productCode: 100, quantity: 3, scanID: 12345 },
    { productCode: 200, quantity: 1, scanID: 227443 },
    { productCode: 300, quantity: 3, scanID: 333333 },
  ]);

  /*

    formItemNum: undefined,
    formQuantity: undefined,

*/

  const handleAddItem = (itemObj) => {
    const newItem = {
      productCode: itemObj.formItemNum,
      quantity: itemObj.formQuantity,
      scanID: idGenerator(),
    };

    editCart((currentCart) => {
      return [...currentCart, newItem];
    });
  };

  // this is just a test.
  const testContextFunc = (localvar) => {
    console.log(localvar);
  };

  const handleDelete = (event) => {
    // should the id-getter be at a lower level?  It might not be universal?
    const clickedID = event.currentTarget.id;

    const newCart = cart.filter((entry) => {
      return entry.scanID.toString() !== clickedID;
    });

    console.log(newCart);
    editCart(newCart);
  };

  return (
    <main className={classes.container}>
      <Outlet
        context={{
          cart: cart,
          editcart: editCart,
          idGenerator: idGenerator,
          handleDelete: handleDelete,
          handleAddItem: handleAddItem,
          testContextFunc: testContextFunc,
        }}
      />
    </main>
  );
};

export default Returns;
