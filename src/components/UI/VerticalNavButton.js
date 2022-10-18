import classes from "./VerticalNavButton.module.css";
import { Link } from "react-router-dom";
import {
  BoxLineIcon,
  EmailLineIcon,
  ExchangeLineIcon,
  PhoneLineIcon,
  PrintLineIcon,
  XmarkLineIcon
} from "../../assets/lowes-icons/Line-Icons/LineIcons";
import { MdArrowBack } from "react-icons/md";

const VerticalNavButton = (props) => {
  // const buttonStyle = {}
  return (
    <Link className={classes.main}>
      <PrintLineIcon className={classes.icon1}/>
      <p>{props.label}</p>
      <MdArrowBack className={classes.icon2} />
    </Link>
  );
};

export default VerticalNavButton;
