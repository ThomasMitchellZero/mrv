import classes from "./ReturnsIndex.module.css";

// 30 panel components
import Actions30 from "../Actions30";
import ItemEntry30 from "../Add_Items/ItemEntry30";
import InvoiceEntry30 from "../Add_Invoices/InvoiceEntry30";

import StartScanning from "./StartScanning70";

import { useReducer, useEffect } from "react";
import { useOutletContext } from "react-router-dom";


const panelsReducer = (state, action) => {
  switch (action.type) {
    // 30 panel actions

    case "Actions": {
      return { ...state, state30: "actions" };
    }

    case "Item_Entry": {
      return { ...state, state30: <ItemEntry30 /> };
    }

    case "Invoice_Entry": {
      return { ...state, state30: <InvoiceEntry30 /> };
    }

    // 70 Panel Actions

    // 70 + 30 Panel Actions

    case "Start": {
      return {
      };
    }

    default:
      throw new Error(`There is no 70 panel called  type: ${action.type}`);
  }
};

const ReturnsIndex = (props) => {
  const returnsContext = useOutletContext();

  const [activePanels, dispatchActivePanels] = useReducer(
    panelsReducer,
    {
      state30: "actions",
      state70: "start_scanning",
    }
  );

  const thirty_panels = {
    actions: <Actions30 panelsReducer={dispatchActivePanels} />,
    item_entry: <ItemEntry30 panelsReducer={dispatchActivePanels} />,
    invoice_entry: <ItemEntry30 panelsReducer={dispatchActivePanels} />,
  };

  const seventy_panels = {
    start_scanning: <StartScanning panelsReducer={dispatchActivePanels} />,
  };

  return (
    <main className={classes.container}>
      <section className={`seventy_panel ${classes.session_info}`}>
        {seventy_panels[activePanels.state70]}
      </section>
      <section className={`thirty_panel ${classes.action_menu}`}>
        {thirty_panels[activePanels.state30]}
      </section>
    </main>
  );
};

export default ReturnsIndex;
