import classes from "./ItemEntry.module.css"

import TitleBar from "../../../components/UI/TitleBar"
import FooterContainer from "../../../components/UI/FooterContainer"
import Button from "../../../components/UI/Button"

const ItemEntry = ()=>{
    return <form className={`thirty_panel`}>
        <TitleBar lefticon="back" lefturl="..">Item Entry</TitleBar>
        <div className={classes.maincontent}>

        </div>
        <FooterContainer>
            <Button  buttonType="primary" buttonSize="large" className={classes.button}>Add Item</Button>
        </FooterContainer>
    </form>
}

export default ItemEntry;