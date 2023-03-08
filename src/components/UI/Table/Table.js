import classes from "./Table.module.css";

import TableHeading from "./TableHeading";

const Table = ({
  tableHeadingArray,
  tableBodyArray,
  hasItemAction,
  hasActiveIndicator = false,
  scrollOnOverflow = true,
}) => {
  const scrolling = scrollOnOverflow ? classes.scrollable : "";

  // populates the table heading from an array of objects
  let tableHeadings = tableHeadingArray.map((item) => {
    return (
      <TableHeading
        key={item.id}
        id={item.id}
        active={item.active}
        descending={item.descending}
        width={item.width}
        onClick={item.handleHeadingClick}
      >
        {item.id}
      </TableHeading>
    );
  });

  // if <tr>s have button or active indicator, these 2 conditions keep columns aligned.
  if (hasItemAction) {
    tableHeadings.push(
      <th key="spacer" style={{ width: "2rem", height: "1rem" }} />
    );
  }

  if (hasActiveIndicator) {
    tableHeadings.unshift(<th key="indicator" className="activeStatusBar" />);
  }

  return (
    <section className={`${classes.container} ${scrolling}`}>
      <table >
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>{tableBodyArray}</tbody>
      </table>
    </section>
  );
};

export default Table;
