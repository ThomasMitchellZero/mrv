import classes from "./TitleBar.module.css";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";


const TitleBar = (props) => {
  const iconHandler = (str) => {
    if (str === "close") {
      return <MdOutlineClose />;
    } else if (str === "back") {
      return <MdArrowBack />;
    } else return null;
  };

  const lefticon = iconHandler(props.lefticon);
  const righticon = iconHandler(props.righticon);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <button onClick={props.left_onClick} className={classes.iconholder}>
          {lefticon}
        </button>
        <p>{props.children}</p>
        <button onClick={props.right_onClick} className={classes.iconholder}>
          {righticon}
        </button>
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default TitleBar;

//  <div className={classes.iconholder}>{lefticon}</div>

//  <button className={classes.iconholder}>{lefticon}</button>
