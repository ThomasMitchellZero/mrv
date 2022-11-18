import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";
import ProductContext from "../../store/product-context";
import InvoiceContext from "../../store/invoice-context";
import { useContext, useReducer } from "react";
import toilet_img from "../../assets/product-images/toilet.png";

// controls the Session object
const sessionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const newKey = action.payload.itemNum;

      const newItemList = { ...state.items, [newKey]: action.payload };
      return { ...state, items: newItemList };

    case "REMOVE_ITEM":

      let ItemsList = state.items;

      delete ItemsList[action.payload];

      return { ...state, items: ItemsList };

    case "CLEAR_SESSION":
      return { items: [], invoices: [] };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

//Returns Component
const Returns = () => {
  const productContext = useContext(ProductContext);
  const invoiceContext = useContext(InvoiceContext);
  console.log(invoiceContext.AAA.invoiceDetails.store)

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
    items: {
      400: {
        quantity: 1,
        img: toilet_img,
        price: 8.75,
        itemNum: "400",
        modelNum: "RT3301",
        description: "American Standard Grand Duke II with Ultra-Flush",
        categories: ["Stock", "Special Order"],
      },
    },
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

  // going to try to make this universal.
  const invoiceContextMatcher = (itemNum) => {
    if (invoiceContext[itemNum]) {
      return invoiceContext[itemNum];
    } else {
      return false;
    }
  };

  const handleAddItem = (itemObj) => {
    // checks if this item is already in session and returns quantity based on result.
    const oldQuantity =
      `${itemObj.itemNum}` in session.items
        ? session.items[itemObj.itemNum].quantity
        : 0;

    const newItem = {
      ...productContextMatcher(itemObj.itemNum),
      quantity: oldQuantity + parseInt(itemObj.quantity),
    };

    dispatchSession({ type: "ADD_ITEM", payload: newItem });
  };

  // I would like to delete this and use the reducer from the button in the LE but it gives an error and I don't know why.
  const handleRemoveItem = (event) => {
    const clickedID = event.currentTarget.id;
    dispatchSession({ type: "REMOVE_ITEM", payload: clickedID });
  };

  return (
    <main className={classes.container}>
      <Outlet
        context={{
          session: session,
          dispatchSession: dispatchSession,
          idGenerator: idGenerator,
          handleDelete: handleRemoveItem,
          handleAddItem: handleAddItem,
          productContextMatcher: productContextMatcher,
          invoiceContextMatcher: invoiceContextMatcher,
        }}
      />
    </main>
  );
};

export default Returns;

/*


*/
