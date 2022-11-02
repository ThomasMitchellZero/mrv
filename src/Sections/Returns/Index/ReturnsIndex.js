import classes from "./ReturnsIndex.module.css";

// 30 panel components
import ReturnsActions30 from "../ReturnsActions30";
import ItemEntry from "../Scan_Items/ItemEntry";


import StartScanning from "./StartScanning";

import { useReducer,  } from "react";
import { useOutletContext } from "react-router-dom";

// controls the active 30-panel
const active30Reducer = (state, action) => {
  switch (action.type) {
    case "Default":
      return{}
    default:
      throw new Error(`There is no 30 panel called  type: ${action.type}`);
  }
};

// controls the active 70-panel
const active70Reducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error(`There is no 70 panel called  type: ${action.type}`);
  }
};

const ReturnsIndex = (props) => {

  const returnsContext = useOutletContext();

  return (
    <main className={classes.container}>
      <section className={`seventy_panel ${classes.session_info}`}>
        <StartScanning />
      </section>
      <section className={`thirty_panel ${classes.action_menu}`}>
        <ItemEntry returnsContext={returnsContext}/>
      </section>
    </main>
  );
};

export default ReturnsIndex;
