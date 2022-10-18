import classes from "./VerticalNavButton.module.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const VerticalNavButton = (props) => {
  // const buttonStyle = {}
  return (
    <Link className={classes.container}>
      {props.mainIcon}
      <p>{props.label}</p>
      <MdKeyboardArrowRight className={classes.icon2} />
    </Link>
  );
};

export default VerticalNavButton;

/*
      {props.mainIcon}

*/
