import classes from "./Table.module.css";

const Table = (props) => {
  return (
    <div>
      <p>Sur La Table</p>
      <table>
        <thead>
          <tr>
            <th>One Head</th>
            <th>Two Head</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>this and this and that</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
