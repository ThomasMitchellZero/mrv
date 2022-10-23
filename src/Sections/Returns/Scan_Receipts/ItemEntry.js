import classes from "./ItemEntry.module.css"

import TitleBar from "../../../components/UI/TitleBar"
import FooterContainer from "../../../components/UI/FooterContainer"

const ItemEntry = ()=>{
    return <form className={`thirty_panel`}>
        <TitleBar lefticon="back" lefturl="..">Item Entry</TitleBar>
        <div className={classes.maincontent}>

        </div>
        <FooterContainer>
            <button type="button" className="baseButton primary large">Add Item</button>
        </FooterContainer> 
    </form>
}

export default ItemEntry;