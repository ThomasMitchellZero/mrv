import classes from "./TableHeading.module.css";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

const TableHeading = (props) => {
  const downArrow = <MdArrowDownward className={classes.icon}/>;
  const upArrow = <MdArrowUpward className={classes.icon}/>;

  return (
    <th>
      <div className={classes.tableheading}>
        <p>{props.children}</p>
        {downArrow}
      </div>
    </th>
  );
};

export default TableHeading;
