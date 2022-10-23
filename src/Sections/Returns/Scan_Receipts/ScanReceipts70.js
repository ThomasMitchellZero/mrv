import { useOutletContext } from "react-router-dom";

import classes from "./ScanReceipts70.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import Footer from "../../../components/UI/FooterContainer";
import ScanGraphic from "./ScanGraphic/ScanGraphic";
import ReturnItemTable from "./ReturnItemTable/ReturnItemTable";
import Table from "../../../components/UI/Table";

const ScanReciepts70 = () => {
  // OK, so it looks like I can pass multiple props via useOutletContext as either an array or an object.

  const test = useOutletContext();
  console.log(test);

  /*

        { product: 100, quantity: 3, id: idGenerator() },

        key={item.id}
        id={item.id}
        active={item.active}
        descending={item.descending}
        flexing={item.flexing}
        onClick={item.handleHeadingClick}
  */

  const itemTableHeadings = [
    { id: "ID #", active: false, descending: true, flexing: "auto" },
    { id: "Product Number", active: false, descending: true, flexing: "auto" },
    { id: "Trash", active: false, descending: true, flexing: "auto" },
    
  ];

  //use the .filter() method to remove an item from an array.

  return (
    <div className={`seventy_panel ${classes.container}`}>
      <TitleBar lefticon="close">Scan Receipts</TitleBar>
      <div className={classes.main_content}>
        <Table tableHeadingArray={itemTableHeadings}></Table>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ScanReciepts70;

/*

        <ScanGraphic
          graphic="Universal"
          mainText="Start Scanning"
          subText="You may scan or enter multiple receipts or items"></ScanGraphic>


*/
