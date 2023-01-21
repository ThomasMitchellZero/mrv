import classes from "./TotalReview.module.css";

import TitleBar from "../../../components/UI/DisplayOutputs/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import InPageTitleBox from "../../../components/UI/DisplayOutputs/InPageTitleBox";
import MiniItemLI from "../../../components/UI/DisplayOutputs/MiniItemLI";
import RefundTotal from "../../../components/UI/DisplayOutputs/RefundTotal";
import Table from "../../../components/UI/Table/Table";

import { useNavigate, useOutletContext, Link } from "react-router-dom";

const TotalReview = () => {
  const returnsContext = useOutletContext();
  const navigate = useNavigate();

  const refund_moneyObj = returnsContext.session.refund_money;
  const returningItems = Object.entries(returnsContext.session.matched);
  const tendersListArr = Object.entries(
    returnsContext.session.refunds_by_tender
  );

  // 30-Panel
  const miniLIarr = returningItems.map((item) => {
    return <MiniItemLI key={item[0]} itemObj={item[1]} totalPrice={true} />;
  });

  // 70-Panel

  const headingList = [
    { id: "Refund Amount", active: false, descending: true, width: "25%" },
    { id: "Original Tender", active: false, descending: true, width: "auto" },
    { id: "Refund To Tender", active: false, descending: true, width: "auto" },
  ];

  const tendersList = tendersListArr.map((thisTender) => {
    const tenderData = thisTender[1];
    return (
      <tr key={thisTender[0]}>
        <td>{`$${(tenderData.paid / 100).toFixed(2)}`}</td>
        <td>{tenderData.tenderLabel}</td>
        <td>{thisTender[0]}</td>
      </tr>
    );
  });

  return (
    <section className={classes.container}>
      <section className={`thirty_panel `}>
        <TitleBar>Returned Items</TitleBar>
        <section className={`${classes.mainContent} ${classes.thirtyContent}`}>
          {miniLIarr}
        </section>
        <FooterContainer>
          <RefundTotal dataObj={refund_moneyObj} hideAdjust={true} />
        </FooterContainer>
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
          <InPageTitleBox
            hasDivider={false}
            mainTitle={`$${(refund_moneyObj.refundTotal / 100).toFixed(
              2
            )} will refund to the tender(s) below`}
          />
          <Table
            hasItemAction={false}
            hasActiveIndicator={false}
            tableHeadingArray={headingList}
            tableBodyArray={tendersList}
          />
        </section>
        <FooterContainer></FooterContainer>
      </section>
    </section>
  );
};

export default TotalReview;
