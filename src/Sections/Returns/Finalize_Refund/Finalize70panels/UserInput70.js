import classes from "./UserInput70.module.css"

import TitleBar from "../../../../components/UI/DisplayOutputs/TitleBar"
import FooterContainer from "../../../../components/UI/PageLayout/FooterContainer"
import TenderBadges from "../TenderBadges"
import InPageTitle from "../../../../components/UI/DisplayOutputs/InPageTitleBox"

import tType from "../../../../components/global_functions/tenderTypes"

const UserInput70 = ({activeTenderObj, mainButton, altButton})=>{
    return <section className={`seventy_panel `}>
    <TitleBar>Refund Details</TitleBar>
    <section className={`${classes.mainContent}`}>
      <TenderBadges tender1={tType.check} tender2={tType.check} />
      <InPageTitle
        topContent={""}
        hasDivider={false}
        mainTitle={`Main`}
        subTitle={`Sub`}
      />
    </section>
    <FooterContainer>
      {altButton}
      {mainButton}
    </FooterContainer>
  </section>
}

export default UserInput70