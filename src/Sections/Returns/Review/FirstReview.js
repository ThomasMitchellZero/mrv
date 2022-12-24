import classes from "./FirstReview.module.css"

import TitleBar from "../../../components/UI/TitleBar"
import FooterContainer from "../../../components/UI/FooterContainer"

const FirstReview = ()=>{

    return <main className={classes.container}>
        <TitleBar></TitleBar>
        <section className={classes.mainContent}>

        </section>
        <FooterContainer></FooterContainer>

    </main>
}

export default FirstReview