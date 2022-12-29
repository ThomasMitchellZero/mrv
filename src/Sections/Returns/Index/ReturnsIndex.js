import classes from "./ReturnsIndex.module.css";

// 30 panel components
import Actions30 from "./Actions30";
import ItemEntry30 from "../Add_Items/ItemEntry30";
import InvoiceEntry30 from "../Add_Invoices/InvoiceEntry30";
import ItemDetails30 from "../Add_Items/ItemDetails30";

//70 Panel components
import StartScanning from "./StartScanning70";
import SessionItems70 from "../Add_Items/SessionItems70";
import SessionInvoices70 from "../Add_Invoices/SessionInvoices70";

import { useReducer } from "react";
import { useOutletContext } from "react-router-dom";

const panelsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PANELS": {
      const new30 = action.payload.set30 ? action.payload.set30 : state.state30;
      const new70 = action.payload.set70 ? action.payload.set70 : state.state70;
      const newDetails = action.payload.details
        ? action.payload.details
        : state.stateDetails;

      return {
        state30: new30,
        state70: new70,
        stateDetails: newDetails,
      };
    }

    default:
      throw new Error(`There is no panel called  type: ${action.type}`);
  }
};

const ReturnsIndex = () => {
  const returnsContext = useOutletContext();

  // status of cart emptiness for Actions30


  const [activePanels, dispatchActivePanels] = useReducer(panelsReducer, {
    state30: "actions",
    state70: "session_items",
    stateDetails: 200,
  });

  const thirty_panels = {
    actions: (
      <Actions30 dispatchActive={dispatchActivePanels} returnState={returnsContext} />
    ),
    item_entry: (
      <ItemEntry30
        dispatchActivePanels={dispatchActivePanels}
        returnsContext={returnsContext}
      />
    ),
    item_details: (
      <ItemDetails30
        dispatchActivePanels={dispatchActivePanels}
        returnsContext={returnsContext}
        activeItem={activePanels.stateDetails}
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
      <section className={`seventy_panel`}>
        {seventy_panels[activePanels.state70]}
      </section>
      <section className={`thirty_panel`}>
        {thirty_panels[activePanels.state30]}
      </section>
    </main>
  );
};

export default ReturnsIndex;

/*

        {thirty_panels[activePanels.state30]}


*/
