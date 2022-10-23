import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext } from "react";

const Returns = () => {
  const productContext = useContext(ProductContext);

  return (
    <main className={classes.container}>

        <Outlet />

    </main>
  );
};

export default Returns;
