import classes from "./messageRibbon.module.css"

const MessageRibbon = ({text, color = "gold", size="large"})=>{
    return <div className={`${classes.container}`}>{text}</div>
}

export default MessageRibbon