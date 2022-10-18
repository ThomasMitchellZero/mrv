import classes from "./VerticalNavButton.module.css";
import { Link } from "react-router-dom";
import {
  BoxLineIcon,
  EmailLineIcon,
  ExchangeLineIcon,
  PhoneLineIcon,
  PrintLineIcon,
  XmarkLineIcon,
  AddCartLineIcon,
  CloseLineIcon,
  LookupLineIcon,
  ReceiptLineIcon,
  SlashCartLineIcon,
  SlashCashLineIcon,
} from "../../assets/lowes-icons/Line-Icons/LineIcons";
import { MdKeyboardArrowRight } from "react-icons/md";

const VerticalNavButton = (props) => {
  // const buttonStyle = {}
  return (
    <Link className={classes.container}>
      <SlashCashLineIcon className={classes.icon1} />
      <p>{props.label}</p>
      <MdKeyboardArrowRight className={classes.icon2} />
    </Link>
  );
};

export default VerticalNavButton;

/*
      {props.mainIcon}

*/
