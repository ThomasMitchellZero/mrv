import classes from "./TitleBar.module.css";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

const TitleBar = ({
  lefticon,
  righticon,
  left_onClick,
  right_onClick,
  title,
  children,
}) => {
  const iconHandler = (str) => {
    if (str === "close") {
      return <MdOutlineClose fontSize="1.5rem" />;
    } else if (str === "back") {
      return <MdArrowBack fontSize="1.5rem" />;
    } else return null;
  };

  const leftIcon = iconHandler(lefticon);
  const rightIcon = iconHandler(righticon);

  return (
    <div className={`divider-bottom ${classes.container}`}>
      <button
        type="button"
        onClick={left_onClick}
        className={classes.iconholder}
      >
        {leftIcon}
      </button>
      <h3>
        {children}
        {title}
      </h3>
      <button
        type="button"
        onClick={right_onClick}
        className={classes.iconholder}
      >
        {rightIcon}
      </button>
    </div>
  );
};

export default TitleBar;

//  <div className={classes.iconholder}>{lefticon}</div>

//  <button className={classes.iconholder}>{lefticon}</button>
