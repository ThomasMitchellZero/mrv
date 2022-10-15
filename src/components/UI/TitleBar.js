import classes from "./TitleBar.module.css";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

const TitleBar = (props) => {

  const iconHandler = (str) => {
    if (str === "close") {
      return <MdOutlineClose />;
    } else if (str === "back") {
      return <MdArrowBack />
    } else return null
  };

  const lefticon = iconHandler(props.lefticon)
  const righticon = iconHandler(props.righticon)

  return (
    <div className={classes.titlebar}>
      <div className={classes.content}>
        <div className={classes.iconholder}>{lefticon}</div>
        <p>{props.children}</p>
        <div className={classes.iconholder}>{righticon}</div>
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default TitleBar;
