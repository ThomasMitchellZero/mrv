import classes from "./LineIcons.module.css"
import Blank from "./Blank.svg"
import Box from "./Box.svg"
import Email from "./Email.svg"
import Exchange from "./Exchange.svg"
import Phone from "./Phone.svg"
import Print from "./Print.svg"
import Truck from "./Truck.svg"
import XMark from "./X-mark.svg"

const LineIcon = (props)=>{
    return <img src={props.src} alt="icon" className={`${classes.lineIcon} ${props.className}`}></img>
}

// start here - go through and make components of all of the icons.

export const BlankLineIcon = (props)=>{
    return <LineIcon src={Blank} className={props.className}/>
}

export const BoxLineIcon = (props)=>{
    return <LineIcon src={Box} className={props.className}/>
}

export const EmailLineIcon = (props)=>{
    return <LineIcon src={Email} className={props.className}/>
}

export const ExchangeLineIcon = (props)=>{
    return <LineIcon src={Exchange} className={props.className}/>
}

export const PhoneLineIcon = (props)=>{
    return <LineIcon src={Phone} className={props.className}/>
}

export const PrintLineIcon = (props)=>{
    return <LineIcon src={Print} className={props.className}/>
}

export const TruckLineIcon = (props)=>{
    return <LineIcon src={Truck} className={props.className}/>
}

export const XmarkLineIcon = (props)=>{
    return <LineIcon src={XMark} className={props.className}/>
}