import { useContext } from "react";
import ProductContext from "../../../store/product-context";
import { useOutletContext } from "react-router-dom";

const useTest = ({ dispatcherFunction }) => {

  const returnsCtx = useOutletContext();
  const handleDispatch = returnsCtx.dispatchSession


  const items = useContext(ProductContext);
  return ({ a = "animal" }) => {

    console.log(returnsCtx)
    console.log(items[100].description);
    handleDispatch({
      type: "SET_MODAL",
      payload: { catTitle: "God-Emperor" },
    });
    console.log(a);
  };
};

export { useTest };
