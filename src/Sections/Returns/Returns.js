import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext, useState } from "react";

const Returns = () => {
  const productContext = useContext(ProductContext);

  const idGenerator = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleDelete=(event)=>{
    console.log(event.currentTarget)
    //console.log(event.currentTarget.parentNode.parentNode.getAttribute())
  }

  const [cart, editCart] = useState([
    { product: 100, quantity: 3, id: 12345 },
    { product: 200, quantity: 1, id: 227443 },
    { product: 300, quantity: 3, id: 333333 },
  ]);

  return (
    <main className={classes.container}>
      <Outlet
        context={{ cart: cart, editcart: editCart, idGenerator: idGenerator, handleDelete: handleDelete, }}
      />
    </main>
  );
};

export default Returns;
