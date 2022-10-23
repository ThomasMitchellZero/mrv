import classes from "./Table.module.css";
import TableHeading from "./TableHeading";

const Table = (props) => {
  const tableHeadings = props.tableHeadingArray.map((item) => {
    return (
      <TableHeading
        key={item.id}
        id={item.id}
        active={item.active}
        descending={item.descending}
        flexing={item.flexing}
        onClick={item.handleHeadingClick}
      >
        {item.id}
      </TableHeading>
    );
  });

  const nestedObjArr=[
    { product: 100, quantity: 3, id: 557743 },
    { product: 200, quantity: 1, id: 227443 },
    { product: 300, quantity: 3, id: 333333 },
  ]

  const objectColumnizer = (rowfunction, array) => {
    return array.map((item) => {
      return rowfunction(item);
    });
  };

  const testRowObjer = (line) => {
    return (
      <tr key={line.id}>
        <td>{line.id}</td>
        <td>{line.product}</td>
        <td>X</td>
      </tr>
    );
  };

  const test = objectColumnizer(testRowObjer, nestedObjArr);

  return (
    <div>
      <p>Sur La Table</p>
      <table>
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>{test}</tbody>
      </table>
    </div>
  );
};

export default Table;
