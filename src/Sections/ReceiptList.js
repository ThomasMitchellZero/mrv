import TitleBar from "../components/UI/TitleBar";
import Table from "../components/UI/Table";
import TableHeading from "../components/UI/TableHeading";

const ReceiptList = () => {
  const handleHeadingClick = (event) => {
    const origin = event.target;
    console.log(origin);
  };

  const headingList = [
    { id: "Sale Date", active: false, descending: true, flexing: "auto" },
    { id: "Invoice #", active: false, descending: true, flexing: "auto" },
    { id: "Store #", active: false, descending: true, flexing: "auto" },
    { id: "Line Items", active: false, descending: true, flexing: "auto" },
    { id: "Total", active: false, descending: true, flexing: "10%" },
  ];

  const tableContentsArr = [
    {
      saleDate: new Date(2022, 6, 13),
      invoice: 12333,
      store: 2233,
      lineItems: 2,
      total: "$123.45",
    },
    {
      saleDate: new Date(2022, 1, 19),
      invoice: 14373,
      store: 2233,
      lineItems: 4,
      total: "$420.69",
    },
  ];

  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };


  const tableBodyContents = tableContentsArr.map((item) => {
    return (
      <tr key={item.invoice}>
        <td>{item.saleDate.toLocaleDateString("en-US", dateOptions)}</td>
        <td>{item.invoice}</td>
        <td>{item.store}</td>
        <td>{item.lineItems}</td>
        <td>{item.total}</td>
      </tr>
    );
  });

  return (
    <div>
      <TitleBar lefticon="back">Receipt List</TitleBar>
      <p>Receipt List (coming soon)</p>
      <Table
        tableHeadingArray={headingList}
        tableBodyContents={tableBodyContents}
      ></Table>
    </div>
  );
};

export default ReceiptList;

/*
  const tableContents = [
    [
      { saleDate: "10 Jan 2022" },
      { invoice: 12333 },
      { store: 2233 },
      { lineItems: 2 },
      { total: "$123.45" },
    ],
    [
      { saleDate: "13 Jan 2022" },
      { invoice: 14373 },
      { store: 2233 },
      { lineItems: 3 },
      { total: "$420.69" },
    ],
  ];

  */
