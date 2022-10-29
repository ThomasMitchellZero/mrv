import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext, useState } from "react";
import toilet_img from "../../assets/product-images/toilet.png";

const Returns = () => {
  const productContext = useContext(ProductContext);

  const idGenerator = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const [cart, editCart] = useState([
    {
      productData: {
        img: toilet_img,
        price: 8.75,
        itemNum: "400",
        modelNum: "RT3301",
        description: "American Standard Grand Duke II with Ultra-Flush",
        categories: ["Stock", "Special Order"],
      },
      scanDetails: {
        quantity: "1",
        scanID: 511415,
      },
    },
  ]);

  const productContextMatcher = (itemNum) => {
    if (productContext[itemNum]) {
      return productContext[itemNum];
    } else {
      return false;
    }
  };

  // combines the scan data and the data from the corresponding product, then updates the cart state.
  const handleAddItem = (itemObj) => {
    const newItem = {
      productData: productContextMatcher(itemObj.itemNum),
      scanDetails: {
        quantity: itemObj.quantity,
        scanID: idGenerator(),
      },
    };

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
          productContextMatcher:productContextMatcher,
        }}
      />
    </main>
  );
};

export default Returns;
