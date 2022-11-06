import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { useContext, useReducer } from "react";
import toilet_img from "../../assets/product-images/toilet.png";

// controls the Session object
const sessionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const newItemList = [...state.items, action.payload];
      return { ...state, items: newItemList };

    case "REMOVE_ITEM":
      const newItemsList = state.items.filter((entry) => {
        return entry.scanDetails.scanID.toString() !== action.payload;
      });
      return { ...state, items: newItemsList };

    case "CLEAR_SESSION":
      return { items: [], invoices: [] };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

//Returns Component
const Returns = () => {
  const productContext = useContext(ProductContext);

  const idGenerator = () => {
    return Math.floor(Math.random() * 1000000);
  };

  // Generates a long list of numbers to test scrolling.
  const testDataMaker = (length) => {
    let output = [];
    for (let i = 0; i < length; i++) {
      output = [
        ...output,
        {
          id: i,
          content: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          date: "5 August 1983",
        },
      ];
    }
    return output;
  };

  const testData = testDataMaker(55);

  // Primary reducer for tracking Items and Invoices.
  const [session, dispatchSession] = useReducer(sessionReducer, {
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
    invoices: [
      {
        saleDate: new Date(2022, 6, 13),
        invoice: 12333,
        store: 2233,
        lineItems: 2,
        total: "$123.45",
      },
      {
        saleDate: new Date(2022, 1, 19),
        invoice: 14373,
        store: 2233,
        lineItems: 4,
        total: "$420.69",
      },
    ],
    testData: testData,
  });

  // Checks to see if an item is in the catelog.
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
    const clickedID = event.currentTarget.id;
    dispatchSession({ type: "REMOVE_ITEM", payload: clickedID });
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


/*


*/