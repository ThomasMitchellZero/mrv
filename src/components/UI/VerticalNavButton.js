import classes from "./VerticalNavButton.module.css";
import { Link } from "react-router-dom";
import Email from "../../assets/lowes-icons/Line-Icons/Email.svg";
import Truck from "../../assets/lowes-icons/Line-Icons/Truck.svg";
import {
  BoxLineIcon,
  EmailLineIcon,
  Ztest,
} from "../../assets/lowes-icons/Line-Icons/LineIcons";
import { MdArrowBack } from "react-icons/md";

const VerticalNavButton = (props) => {
  // const buttonStyle = {}
  return (
    <Link className={classes.main}>
      <div className={classes.icon1}>
        <Ztest size="100%" fill="aqua" />
      </div>

      <p>{props.label}</p>
      <MdArrowBack className={classes.icon2} />
    </Link>
  );
};

export default VerticalNavButton;
