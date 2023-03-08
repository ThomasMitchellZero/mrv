import classes from "./TableHeading.module.css";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useState } from "react";

const TableHeading = (props) => {
  // might be worth looking at doing the arrow state as a single object?
  const [isActive, setIsActive] = useState(false);

  const iconClasses = `${classes.icon} ${isActive ? `${classes.active}` : ""}`;

  const downArrow = <MdArrowDownward className={iconClasses} />;
  const upArrow = <MdArrowUpward className={iconClasses} />;

  const clickHandler = (event) => {
    console.log(event.target);
  };

  return (
    <th onClick={clickHandler} style={{ width: `${props.width}` }}>
      <div className={classes.tableheading}>
        <h4>{props.children}</h4>
      </div>
    </th>
  );
};

export default TableHeading;
