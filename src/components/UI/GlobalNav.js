import classes from "./GlobalNav.module.css"
import pagoda from "../../assets/lowes-logo.svg";
import NavTab from "./NavTab";
import { useState } from "react";

const GlobalNav = () => {
  const [activeTab, setActiveTab] = useState("Returns");

  const tabClickHandler = (event) => {
    event.preventDefault();
    const eTarget = event.target.id
    console.log(event.target.id);
    setActiveTab(eTarget);
  };

  const tabList = [
    { id: "Homepage", key: "Homepage" },
    { id: "Orders", key: "Orders" },
    { id: "Showroom", key: "Showroom" },
    { id: "Returns", key: "Returns" },
  ];

  const tabJSX = tabList.map((item) => {
    return (
      <NavTab
        id={item.id}
        onClick={tabClickHandler}
        active={item.id === activeTab}
        key={item.id}
      />
    );
  });

  return (
    <div className={classes.globalnav}>
      <img className={classes.icon} src={pagoda} alt="Lowes Pagoda" />
      <div>{tabJSX}</div>
    </div>
  );
};

export default GlobalNav;
