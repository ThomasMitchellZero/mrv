import TableHeading from "./TableHeading";

const Table = ({ tableHeadingArray, tableBodyArray, hasItemAction }) => {
  // populates the table heading from an array of objects
  let tableHeadings = tableHeadingArray.map((item) => {
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

  if (hasItemAction) {
    tableHeadings = [
      ...tableHeadings,
      <th key="spacer" style={{ width: "2rem", height: "1rem" }} />,
    ];
  }

  return (
    <div>
      <table>
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>{tableBodyArray}</tbody>
      </table>
    </div>
  );
};

export default Table;
