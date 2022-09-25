import Table from "../components/UI/Table";
import TitleBar from "../components/UI/TitleBar";

const ScannedItemList = (props) => {



    const headingList = [
        { id: "Invoice #", active: false, descending: true, flexing: "auto" },
        { id: "Product Details", active: false, descending: true, flexing: "auto" },
        { id: "Unit Price", active: false, descending: true, flexing: "auto" },
        { id: "Quantity", active: false, descending: true, flexing: "auto" },
        { id: "Total Price", active: false, descending: true, flexing: "auto" },
        { id: "Decline Code", active: false, descending: true, flexing: "auto" },
      ];



  
  
    return (
    <div>
      <TitleBar
        lefticon="back"></TitleBar>
      <Table
        tableHeadingArray={headingList}
        ></Table>
    </div>
  );
};

export default ScannedItemList
