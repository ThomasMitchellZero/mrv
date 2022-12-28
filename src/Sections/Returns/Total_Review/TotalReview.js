import classes from "./TotalReview.module.css"

import TitleBar from "../../../components/UI/TitleBar"

import { Navigate } from "react-router-dom"

const navigate = Navigate()

const TotalReview = ()=>{
    return <section className={classes.container}>
          <TitleBar lefticon={"back"} left_onClick={() => {navigate(-1)}}>
        Total Review
      </TitleBar>
        <h2>Total Review Placeholder</h2>
    </section>
}

export default TotalReview