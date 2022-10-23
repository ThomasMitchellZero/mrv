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

  const tableData = [12345, 200, "X"];

  const tableRower = (line) => {
    return line.map((item) => {
      return <td>{item}</td>;
    });
  };

  const test = tableRower(tableData);
  console.log(test);

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
          <tr>{test}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
