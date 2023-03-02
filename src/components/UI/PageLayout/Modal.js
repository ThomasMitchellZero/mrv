import classes from "./Modal.module.css"

const Modal = ({children,})=>{

    return <section className={classes.container}>
        <section className={classes.window}>
            {children}
        </section>

    </section>
}

export default Modal