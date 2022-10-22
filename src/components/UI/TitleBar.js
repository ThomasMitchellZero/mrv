import classes from "./TitleBar.module.css";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

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
        <div className={classes.iconholder}>{lefticon}</div>
        <p>{props.children}</p>
        <Link className={classes.iconholder}>{righticon}</Link>
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default TitleBar;

//  <div className={classes.iconholder}>{lefticon}</div>

//  <Link className={classes.iconholder}>{lefticon}</Link>
