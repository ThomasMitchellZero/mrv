import classes from "./Table.module.css";
import TableHeading from "./TableHeading";

const Table = (props) => {
  //const headingTitles = props.headerTitles

  const handleHeadingClick = (event) => {
    const origin = event.target;
    console.log(origin);
  };


  // I don't understand how the space is being apportioned here.
  const headingList = [
    { id: "Sale Date", active: false, descending: true, flexing: "auto" },
    { id: "Invoice #", active: false, descending: true, flexing: "auto" },
    { id: "Store #", active: false, descending: true, flexing: "auto" },
    { id: "Line Items", active: false, descending: true, flexing: "auto" },
    { id: "Total", active: false, descending: true, flexing: "10%" },
  ];

  // figure out how to handle the presence of the trash can so this isn't a big old mess.

  const tableHeadings = headingList.map((item) => {
    return (
      <TableHeading
        key={item.id}
        id={item.id}
        active={item.active}
        descending={item.descending}
        flexing={item.flexing}
        onClick={handleHeadingClick}
      >
        {item.id}
      </TableHeading>
    );
  });

  const tableContents = [
    {
      saleDate: "10 Jan 2022",
      invoice: 12333,
      store: 2233,
      lineItems: 2,
      total: "$123.45",
    },
    {
      saleDate: "13 Jan 2022",
      invoice: 14373,
      store: 2233,
      lineItems: 4,
      total: "$420.69",
    },
  ];

  /*

  This is my idea but none of it has been checked.

  const trBuilder = (singleRowArray) => {
    singleRowArray.map((item) => {
      return <td>{item}</td>;
    });
  };

  const tbodyBuilder = (tableRowArray)=>{
    tableRowArray.map((item)=>{
      return(
        <tr>{trBuilder(item)}</tr>
      )
    })
  }




  */

  const tableRows = tableContents.map((item) => {
    return (
      <tr key={item.invoice}>
        <td>{item.saleDate}</td>
        <td>{item.invoice}</td>
        <td>{item.store}</td>
        <td>{item.lineItems}</td>
        <td>{item.total}</td>
      </tr>
    );
  });

  return (
    <div>
      <p>Sur La Table</p>
      <table>
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>this and this and that</td>
            <td>ad-123</td>
            <td>ad-123</td>
            <td>ad-123</td>
          </tr>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
