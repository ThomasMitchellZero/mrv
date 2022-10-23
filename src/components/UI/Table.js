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

  const nestedData = [[12345, 200, "X"], [22222, 300, "X"], [33333, 400, "X"]]

  const tableRower = (line) => {
    return line.map((item) => {
      return <td key={item}>{item}</td>;
    });
  };


  const tableColumnizer = (array)=>{
    return array.map((line)=>{
      return <tr key={line[0]}>{tableRower(line)}</tr>
    })
  }

  const test = tableColumnizer(nestedData);
  console.log(test);

  return (
    <div>
      <p>Sur La Table</p>
      <table>
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>
          {test}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
