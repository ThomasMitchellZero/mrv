import classes from "./Returns.module.css";
import { Outlet } from "react-router-dom";

const Returns = () => {

    
  return (
    <main className={classes.container}>
      <Outlet />
    </main>
  );
};

export default Returns;