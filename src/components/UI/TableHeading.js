import classes from "./TableHeading.module.css";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useState } from "react";

const TableHeading = (props) => {

  const [isActive, setIsActive] = useState(false);
  const [isDescending, setIsDescending] = useState(true);

    // might be worth looking at doing the arrow state as a single object?

  const activeStatus = () => {
    return isActive ? `${classes.active}` : "";
  };

  const downArrow = (
    <MdArrowDownward className={`${classes.icon} ${activeStatus()}`} />
  );
  const upArrow = (
    <MdArrowUpward className={`${classes.icon} ${activeStatus()}`} />
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
