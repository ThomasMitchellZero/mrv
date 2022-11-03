import classes from "./ReturnsIndex.module.css";

// 30 panel components
import Actions30 from "../Actions30";
import ItemEntry from "../Add_Items/ItemEntry30";
import InvoiceEntry from "../Add_Invoices/InvoiceEntry30";


import StartScanning from "./StartScanning70";

import { useReducer, useEffect } from "react";
import { useOutletContext } from "react-router-dom";


const startingState = {
  state30: <Actions30 />,
  state70: <StartScanning />,
};

const panelsReducer = (state, action) => {
  switch (action.type) {

    // 30 panel actions

    case "Actions": {
      return { ...state, state30: <Actions30 /> };
    }

    case "Item_Entry": {
      return { ...state, state30: <ItemEntry /> };
    }

    case "Invoice_Entry": {

      return { ...state, state30: <InvoiceEntry/> };
    }

    // 70 Panel Actions


    // 70 + 30 Panel Actions

    case "Start":{
      return { ...state, state30: <InvoiceEntry/>, state70: <StartScanning /> };
    }

    default:
      throw new Error(`There is no 70 panel called  type: ${action.type}`);
  }
};

const ReturnsIndex = (props) => {

  const returnsContext = useOutletContext();

  const [activePanels, dispatchActivePanels] = useReducer(panelsReducer, startingState);

  // I could create an object of all possible panel components with key names matched to names

  // panelState.30panel[keyname]

  const thirty_panels ={
    actions: <Actions30 panelsReducer={panelsReducer}/>
  }

  return (
    <main className={classes.container}>
      <section className={`seventy_panel ${classes.session_info}`}>
        {activePanels.state70}
      </section>
      <section className={`thirty_panel ${classes.action_menu}`}>
        {activePanels.state30}
      </section>
    </main>
  );
};

export default ReturnsIndex;
