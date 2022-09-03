import classes from "./Table.module.css";
import TableHeading from "./TableHeading";

const Table = (props) => {
  return (
    <div>
      <p>Sur La Table</p>
      <table>
        <thead>
          <tr>
            <TableHeading>One Head</TableHeading>
            <TableHeading>Two Head</TableHeading>
            <th>Three Head</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>this and this and that</td>
            <td>ad-123</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
