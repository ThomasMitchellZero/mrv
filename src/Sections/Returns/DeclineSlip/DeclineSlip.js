import classes from "./DeclineSlip.module.css";
import InPageTitle from "../../../components/UI/DisplayOutputs/InPageTitleBox";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import { Link, useNavigate } from "react-router-dom";

// TO DO: once I have the Receipt options, this should conditionally navigate to there if there are no matched items.

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
          className={`baseButton primary large contained100`}
        >
          OK
        </Link>
      </FooterContainer>
    </section>
  );
};

export default DeclineSlip;
