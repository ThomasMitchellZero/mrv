import classes from "./DeclineSlip.module.css";
import InPageTitle from "../../../components/UI/DisplayOutputs/InPageTitleBox";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import { Link, useNavigate } from "react-router-dom";

const DeclineSlip = () => {
  const navigate = useNavigate();
  return (
    <section className={classes.container}>
      <TitleBar lefticon={"back"} left_onClick={() => navigate(-1)}>
        Declined Items
      </TitleBar>
      <section className={classes.mainContent}>
        <InPageTitle
          hasDivider={false}
          mainTitle="Customer will be issued a decline slip for items not refunded"
        />
      </section>
      <FooterContainer>
        <Link
          to={"../total-review"}
          className={`baseButton primary large uncontained`}
        >
          OK
        </Link>
      </FooterContainer>
    </section>
  );
};

export default DeclineSlip;
