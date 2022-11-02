import classes from "./VerticalNavButton.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";


const VerticalNavButton = (props) => {

  return (
    <button onClick={props.onClick} className={classes.container}>
      {props.mainIcon}
      <p>{props.label}</p>
      <MdKeyboardArrowRight className={classes.icon2} />
    </button>
  );
};

export default VerticalNavButton;
