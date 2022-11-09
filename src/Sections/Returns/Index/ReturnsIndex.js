import classes from "./ReturnsIndex.module.css";

// 30 panel components
import Actions30 from "../Actions30";
import ItemEntry30 from "../Add_Items/ItemEntry30";
import InvoiceEntry30 from "../Add_Invoices/InvoiceEntry30";

//70 Panel components
import StartScanning from "./StartScanning70";
import SessionItems70 from "../Add_Items/SessionItems70";
import SessionInvoices70 from "../Add_Invoices/SessionInvoices70";

import { useReducer, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const panelsReducer = (state, action) => {
  switch (action.type) {
    case "setPanels": {
      const new30 = action.payload.set30 ? action.payload.set30 : state.state30;
      const new70 = action.payload.set70 ? action.payload.set70 : state.state70;
      return { ...state, state30: new30, state70: new70 };
    }

    default:
      throw new Error(`There is no panel called  type: ${action.type}`);
  }
};

const ReturnsIndex = (props) => {
  const returnsContext = useOutletContext();


  const [activePanels, dispatchActivePanels] = useReducer(panelsReducer, {
    state30: "actions",
    state70: "session_items",
  });

  const thirty_panels = {
    actions: <Actions30 dispatchActivePanels={dispatchActivePanels} />,
    item_entry: (
      <ItemEntry30
        dispatchActivePanels={dispatchActivePanels}
        returnsContext={returnsContext}
      />
    ),
    invoice_entry: (
      <InvoiceEntry30
        dispatchActivePanels={dispatchActivePanels}
        returnsContext={returnsContext}
      />
    ),
  };

  const seventy_panels = {
    start_scanning: <StartScanning />,
    session_items: (
      <SessionItems70
        dispatchActivePanels={dispatchActivePanels}
        returnsContext={returnsContext}
      />
    ),
    session_invoices: (
      <SessionInvoices70
        dispatchActivePanels={dispatchActivePanels}
        returnsContext={returnsContext}
      />
    ),
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

/*




*/