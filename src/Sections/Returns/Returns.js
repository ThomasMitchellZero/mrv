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

  ]);


  const productContextMatcher = (itemNum) => {
    if (productContext[itemNum]) {
      return productContext[itemNum];
    } else {
      return false;
    }
  };

  const demo = {
    invoice: 12345,
    img: "pic",
    itemNum: 12345,
    condition: "Good",
    price: 12.99,
    quantity: 12,
    totalPrice: 44.55,
    declineCode: 123,
  };

  const handleAddItem = (itemObj) => {
    const newItem = {
      productData: productContextMatcher(itemObj.formItemNum),
      scanDetails:{
        quantity: itemObj.formQuantity,
        scanID: idGenerator(),
      }
    };

    console.log(newItem);
    editCart((currentCart) => {
      return [...currentCart, newItem];
    });
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
        }}
      />
    </main>
  );
};

export default Returns;
