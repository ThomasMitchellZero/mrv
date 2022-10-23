import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext } from "react";

const Returns = () => {
  const productContext = useContext(ProductContext);
  const cart = "cat"
  const meal = {a:1, b:2}

  return (
    <main className={classes.container}>

        <Outlet context={{alpha: cart, bravo: meal}}/>

    </main>
  );
};

export default Returns;
