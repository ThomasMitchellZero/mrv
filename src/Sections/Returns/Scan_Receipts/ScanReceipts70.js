import { useOutletContext } from "react-router-dom";

import classes from "./ScanReceipts70.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import Footer from "../../../components/UI/FooterContainer";
import ScanGraphic from "./ScanGraphic/ScanGraphic";
import ReturnItemTable from "./ReturnItemTable/ReturnItemTable";
import Table from "../../../components/UI/Table";

const ScanReciepts70 = () => {
  const returnsContext = useOutletContext();

  const itemTableHeadings = [
    { id: "ID #", active: false, descending: true, flexing: "auto" },
    { id: "Product Number", active: false, descending: true, flexing: "auto" },
    { id: "Trash", active: false, descending: true, flexing: "auto" },
  ];

  const itemListTableRower = (line) => {
    return (
      <tr key={line.id}>
        <td>{line.id}</td>
        <td>{line.product}</td>
        <td>
          <button id={line.id} onClick={returnsContext.handleDelete}>X</button>
        </td>
      </tr>
    );
  };

  return (
    <div className={`seventy_panel ${classes.container}`}>
      <TitleBar lefticon="close">Scan Receipts</TitleBar>
      <div className={classes.main_content}>
        <Table
          tableHeadingArray={itemTableHeadings}
          rowFunction={itemListTableRower}
          tableBodyArray={returnsContext.cart}
        ></Table>
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
