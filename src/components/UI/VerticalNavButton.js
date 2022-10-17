import classes from "./VerticalNavButton.module.css"
import { Link } from "react-router-dom"
import Email from "../../assets/lowes-icons/Line-Icons/Email.svg"
import Truck from "../../assets/lowes-icons/Line-Icons/Truck.svg"
import { BoxLineIcon, EmailLineIcon }from "../../assets/lowes-icons/Line-Icons/LineIcons"


const VerticalNavButton = (props) =>{
    // const buttonStyle = {}
    return <Link className={classes.main}>
        <BoxLineIcon className={classes.icon1} />
        <p>{props.label}</p>
        <EmailLineIcon className={classes.icon2}/>
    </Link>
}

export default VerticalNavButton
