import classes from "./TableHeading.module.css";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useState } from "react";

const TableHeading = (props) => {

// might be worth looking at doing the arrow state as a single object?
  const [isActive, setIsActive] = useState(false);
  const [isDescending, setIsDescending] = useState(true);

  const iconClasses = `${classes.icon} ${isActive ? `${classes.active}` : ""}`

  const downArrow = (
    <MdArrowDownward className={iconClasses} />
  );
  const upArrow = (
    <MdArrowUpward className={iconClasses} />
  );

  const clickHandler = (event) => {
    console.log(event.target);
  };

  return (
    <th onClick={clickHandler}>
      <div className={classes.tableheading}>
        <p>{props.children}</p>
        {isDescending ? downArrow : upArrow}
      </div>
    </th>
  );
};

export default TableHeading;
