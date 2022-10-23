import classes from "./Table.module.css";
import TableHeading from "./TableHeading";

const Table = (props) => {

  // populates the table heading from an array of objects
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

  const tableBodyFiller = (rowfunction, array) => {
    return array.map((item) => {
      return rowfunction(item);
    });
  };

  const tableBody = tableBodyFiller(props.rowFunction, props.tableBodyArray);

  return (
    <div>
      <table>
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default Table;
