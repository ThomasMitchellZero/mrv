import classes from "./Table.module.css";
import TableHeading from "./TableHeading";

const Table = (props) => {
  //const headingTitles = props.headerTitles

  const handleHeadingClick = (event) => {
    const origin = event.target;
    console.log(origin);
  };

  /*

  class HeadingListItem {
    constructor(id, active, descending, onClick) {
      this.id = id;
      this.active = active;
      this.descending = descending;
      this.onClick = onClick;
    }
  }
  
  const headingList = [
    new HeadingListItem("Sale Date", false, true),
    new HeadingListItem("Invoice #", false, true),
    new HeadingListItem("Store #", false, true),
    new HeadingListItem("Line Items", false, true),
  ];

*/
  const headingList = [
    { id: "Sale Date", active: false, descending: true },
    { id: "Invoice #", active: false, descending: true },
    { id: "Store #", active: false, descending: true },
    { id: "Line Items", active: false, descending: true },
    { id: "Total", active: false, descending: true },
  ];

  // figure out how to handle the presence of the trash can so this isn't a big old mess.

  const headings = headingList.map((item) => {
    return (
      <TableHeading
        key={item.id}
        id={item.id}
        active={item.active}
        descending={item.descending}
        onClick={handleHeadingClick}
      >
        {item.id}
      </TableHeading>
    );
  });





  return (
    <div>
      <p>Sur La Table</p>
      <table>
        <thead>
          <tr>{headings}</tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>this and this and that</td>
            <td>ad-123</td>
            <td>ad-123</td>
            <td>ad-123</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
