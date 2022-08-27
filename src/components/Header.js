import classes from "./Header.module.css";
import pagoda from "../assets/lowes-logo.svg";
import HeaderTab from "./UI/HeaderTab";
import { useState } from "react";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Homepage");

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
      <HeaderTab
        id={item.id}
        onClick={tabClickHandler}
        active={item.id === activeTab}
        orca="whale"
        key={item.id}
      >
      </HeaderTab>
    );
  });

  return (
    <div className={classes.header}>
      <img className={classes.icon} src={pagoda} alt="Lowes Pagoda" />
      <div>{tabJSX}</div>
    </div>
  );
};

export default Header;
