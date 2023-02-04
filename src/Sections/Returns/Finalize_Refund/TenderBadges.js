import classes from "./TenderBadges.module.css"
import { MdAgriculture } from "react-icons/md";

const TenderBadges = ({icon1, icon2})=>{

    return <section className={`${classes.container}`}>
        <section className={`${classes.badge}`}>
            <MdAgriculture size="6rem" className={`${classes.icon}`}/>
            <h4>name</h4>
        </section>
    </section>

}

export default TenderBadges;