import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext } from "react";

const Returns = () => {
  const productContext = useContext(ProductContext);
  console.log(productContext)

  return (
    <main className={classes.container}>

        <Outlet context={"a"}/>

    </main>
  );
};

export default Returns;
