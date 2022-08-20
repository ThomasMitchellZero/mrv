import classes from "./Header.module.css";
import pagoda from "../assets/lowes-logo.svg";
import HeaderTab from "./UI/HeaderTab";
import { useState } from "react";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Homepage");

  const tabClickHandler = (event) => {};

  const tabList = [
    { value: "Homepage", key: "Homepage" },
    { value: "Orders", key: "Orders" },
    { value: "Showroom", key: "Showroom" },
    { value: "Returns", key: "Returns" },
  ];

  const tabJSX = tabList.map((item) => {
    return <HeaderTab key={item.key}>{item.value}</HeaderTab>;
  });

  return (
    <div className={classes.header}>
      <img className={classes.icon} src={pagoda} alt="Lowes Pagoda" />
      <div>{tabJSX}</div>
    </div>
  );
};

export default Header;
