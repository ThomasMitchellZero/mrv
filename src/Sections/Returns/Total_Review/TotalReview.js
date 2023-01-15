import classes from "./TotalReview.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";
import InPageTitleBox from "../../../components/UI/InPageTitleBox";
import MiniItemLI from "../../../components/UI/MiniItemLI";

import { useNavigate, useOutletContext, Link } from "react-router-dom";

const TotalReview = () => {
  const returnsContext = useOutletContext();
  const navigate = useNavigate();

  const returningItems = Object.entries(returnsContext.session.matched);
  const miniLIarr = returningItems.map((item) => {
    return <MiniItemLI key={item[0]} itemObj={item[1]} totalPrice={true} />;
  });

  return (
    <section className={classes.container}>
      <section className={`thirty_panel `}>
        <TitleBar>Returned Items</TitleBar>
        <section className={`${classes.mainContent} ${classes.thirtyContent}`}>
          {miniLIarr}
        </section>
        <FooterContainer></FooterContainer>
      </section>

      <section className={`seventy_panel`}>
        <TitleBar
          lefticon={"back"}
          left_onClick={() => {
            navigate(-1);
          }}
        >
          Total Review
        </TitleBar>
        <section className={`${classes.mainContent} ${classes.seventyContent}`}>
          <InPageTitleBox mainTitle="$XX.XX will refund to the tender(s) below" />
        </section>
        <FooterContainer></FooterContainer>
      </section>
    </section>
  );
};

export default TotalReview;
