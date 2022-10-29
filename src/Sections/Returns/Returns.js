import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext, useReducer } from "react";
import toilet_img from "../../assets/product-images/toilet.png";

const returnsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      console.log(action.payload)
      console.log(state)
      const newItemList = [...state.items, action.payload];
      console.log([newItemList])
      return { ...state, items: newItemList };
    case "REMOVE_ITEM":
      return { ...state };
    case "CLEAR_SESSION":
      return { items: [], invoices: [] };
    default:
      return state;
  }
};

const Returns = () => {
  const productContext = useContext(ProductContext);

  const idGenerator = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const [session, dispatchSession] = useReducer(returnsReducer, {
    items: [
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
    ],
    invoices: [],
  });

  const productContextMatcher = (itemNum) => {
    if (productContext[itemNum]) {
      return productContext[itemNum];
    } else {
      return false;
    }
  };

  const handleAddItem = (itemObj) => {
    const newItem = {
      productData: productContextMatcher(itemObj.itemNum),
      scanDetails: {
        quantity: itemObj.quantity,
        scanID: idGenerator(),
      },
    };

    dispatchSession({ type: "ADD_ITEM", payload: newItem });
  };

  const handleRemoveItem = (event) => {
    // should the id-getter be at a lower level?  It might not be universal?
    const clickedID = event.currentTarget.id;

    const newItems = session.items.filter((entry) => {
      return entry.scanDetails.scanID.toString() !== clickedID;
    });

    dispatchSession({ type: "REMOVE_ITEM", payload: newItems });
  };

  return (
    <main className={classes.container}>
      <Outlet
        context={{
          session: session,
          idGenerator: idGenerator,
          handleDelete: handleRemoveItem,
          handleAddItem: handleAddItem,
          productContextMatcher: productContextMatcher,
        }}
      />
    </main>
  );
};

export default Returns;
