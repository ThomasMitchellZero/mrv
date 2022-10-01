import classes from "./ProductBadge.module.css"

const ProductBadge = (props)=>{
    return <div className={classes.badge}>
        <p>{props.children}</p>
    </div>
}