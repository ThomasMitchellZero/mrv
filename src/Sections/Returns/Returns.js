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
    { product: 100, quantity: 3, id: idGenerator() },
  ]);

  return (
    <main className={classes.container}>
      <Outlet context={[cart, editCart]} />
    </main>
  );
};

export default Returns;
