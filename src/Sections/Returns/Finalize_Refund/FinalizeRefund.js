import classes from "./FinalizeRefund.module.css";

import tType from "../../../components/global_functions/tenderTypes";
import tStatus from "../functions/tenderStatusCodes";

// Shared Components

import TitleBar from "../../../components/UI/PageLayout/TitleBar";
import FooterContainer from "../../../components/UI/PageLayout/FooterContainer";
import TenderTypesLI from "./TenderTypesLI";
import MessageRibbon from "../../../components/UI/DisplayOutputs/MessageRibbon";

//70 Panels
import UserInput70 from "./Finalize70panels/UserInput70";
import ConfirmCash70 from "./Finalize70panels/ConfirmCash70";
import Payout70 from "./Finalize70panels/Payout70";
import Placeholder from "../../Placeholder/Placeholder";

import { useOutletContext, Navigate } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";

const FinalizeRefund = () => {
  // Returns Session
  const sessionCtx = cloneDeep(useOutletContext().session);
  const dispatchSession = useOutletContext().dispatchSession;
  const ctxTendersPack = sessionCtx.refunds_by_tender;

  const dispatchTenderArr = (outTendersArr) => {
    dispatchSession({
      type: "UPDATE_TENDERS",
      payload: { newtendersArr: outTendersArr },
    });
  };

  // Specifics from Returns Session state
  const tendersArr = ctxTendersPack.tendersArr;
  const activeIndex = ctxTendersPack.activeIndex;
  const allResolved = ctxTendersPack.allComplete;

  // Path shortcuts for the current Active Tender.
  const activeTenderObj = tendersArr[activeIndex];
  const activeStatus = activeTenderObj.status;
  const activeType = activeTenderObj.tenderType;

  // ---- SHARED FUNCTIONS ----

  const buttoner = (style, text, whenClicked) => {
    const sizes = {
      primary: "contained70",
      secondary: "containedBtn2",
    };
    return (
      <button
        onClick={whenClicked}
        className={`baseButton large ${style} ${sizes[style]}`}
      >
        {text}
      </button>
    );
  };

  // ---- STATE-CHANGING FUNCTIONS ----

  const changeStatusOfActive = (futureStatus) => {
    let outTendersArr = cloneDeep(tendersArr);
    outTendersArr[activeIndex].status = futureStatus;

    dispatchTenderArr(outTendersArr);
  };

  // Applies Swapped Status.  Does lots more than the normal state-setter.
  const tTypeSwapper = (swapTo) => {

    // even in a Swap, only Status changes. tType remains constant.  But this function still does need to know the new tType to increment/create it and for display purposes.
    const swappedLabels = {
      [tType.cash]: "Cash",
      [tType.storeCredit]: "Store Credit",
    };

    let outTendersArr = cloneDeep(tendersArr);

    // Change the active tender's info to Swapped.
    outTendersArr[activeIndex] = {
      ...outTendersArr[activeIndex],
      status: tStatus.swapped,
      refundAs: swappedLabels[swapTo],
    };

    const activePaid = activeTenderObj.paid;

    let indexSwappingTo = outTendersArr.findIndex((tender) => {
      return tender.tenderType === tType[swapTo];
    });

    // If this type doesn't already exist...
    if (indexSwappingTo === -1) {
      // add it to start of array
      outTendersArr.unshift({
        primaryKey: tType[swapTo],
        tenderType: tType[swapTo],
        paid: 0,
      });
      indexSwappingTo = 0;
    }

    outTendersArr[indexSwappingTo].paid += activePaid;

    dispatchTenderArr(outTendersArr);
  };

  //---- CONFIGURED 70 PANELS ----

  const emptyUI = (
    <Placeholder
      titleText="Blank"
      extraClasses={`seventy_panel `}
      pageText="You shouldn't be here"
    />
  );

  const paths70 = {
    [tStatus.failure]: (
      <UserInput70
        activeTenderObj={activeTenderObj}
        badge2={tType.storeCredit}
        topInPageContent={
          <MessageRibbon
            text={`${activeTenderObj.tenderLabel} declined. Refund as Store Credit.`}
            color="red"
            width="auto"
          />
        }
        mainButton={buttoner("primary", "Refund Store Credit", () =>
          tTypeSwapper(tType.storeCredit)
        )}
      />
    ),

    [tStatus.progress2Line]: (
      <ConfirmCash70
        tenderObj={activeTenderObj}
        cashNo={changeStatusOfActive}
        cashYes={tTypeSwapper}
      />
    ),

    [tStatus.inProgress]: {
      [tType.cash]: (
        <Payout70
          activeTenderObj={activeTenderObj}
          onClick={changeStatusOfActive}
        />
      ),
      [tType.storeCredit]: (
        <Payout70
          activeTenderObj={activeTenderObj}
          onClick={changeStatusOfActive}
        />
      ),
      [tType.debit]: (
        <UserInput70
          activeTenderObj={activeTenderObj}
          mainButton={buttoner("primary", "Refund To Debit", () =>
            changeStatusOfActive(tStatus.complete)
          )}
          altButton={buttoner("secondary", "Refund With Cash", () =>
            changeStatusOfActive(tStatus.progress2Line)
          )}
        />
      ),
      [tType.check]: (
        <UserInput70
          activeTenderObj={activeTenderObj}
          mainButton={buttoner("primary", "Refund Checking Account", () =>
            changeStatusOfActive(tStatus.complete)
          )}
          altButton={buttoner("secondary", "Refund With Cash", () =>
            changeStatusOfActive(tStatus.progress2Line)
          )}
        />
      ),
    },
  };

  // Active 70 panel, based on combo of status + type.
  const active70 =
    paths70?.[activeStatus]?.[activeType] /* if path for status + type */ ??
    paths70?.[activeStatus] /* if path for status only */ ??
    emptyUI; /* otherwise empty UI. */

  // Make array of the <TenderTypesLI>s  from the sorted tendersArr
  const tendersLIarr = tendersArr.map((thisTenderObj) => {
    return (
      <TenderTypesLI key={thisTenderObj.primaryKey} tenderObj={thisTenderObj} />
    );
  });

  return allResolved ? (
    <Navigate to="../receipt" replace={true} />
  ) : (
    <section className={classes.container}>
      <section className={`thirty_panel }`}>
        <TitleBar>Tender Types</TitleBar>
        <section className={`${classes.mainContent} ${classes.content30}`}>
          {tendersLIarr}
        </section>
        <FooterContainer></FooterContainer>
      </section>
      {active70}
    </section>
  );
};

export default FinalizeRefund;

/*



*/
