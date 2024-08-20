import { useOutletContext } from "react-router";

import {
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { RtrnItemsMainCard } from "./RtrnItemsMainCard";

import { cloneDeep } from "lodash";

const RtrnItemsList = ({ parLocState, setParLocState }) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setSessionItems = useSetSessionItems();

  const aReturnItems = sessionMRV.returnItems;


  const noItems = aReturnItems.length === 0;

  const aMainItems = aReturnItems.filter((returnItem) => {
    return !returnItem.parentKey;
  });


  // blank screen for no items.
  const uiScanItems = (
    <ScanScreenMRV
      mainTitle="scan Or Enter Items Being returned"
      subtitle="Or press 'Receipts' tab to enter receipts"
      iconStr="box"
    />
  );

  const uiItemCardTitle = (
    <div className={`columnTitleRow items_grid`}>
      <div className={`columnTitle detailCol`}>Item</div>
      <div className={`columnTitle totalQtyCol`}>Qty Returned</div>
      <div className={`columnTitle receiptCol`}>Receipt #</div>
      <div className={`columnTitle unitQtyCol`}>Rcpt. Qty</div>
      <div className={`columnTitle unitPriceCol`}>Unit Price</div>
      <div className={`columnTitle totalPriceCol`}>Value</div>
    </div>
  );

  const uiCardArr = aMainItems.map((thisReturnItem) => {
    return <RtrnItemsMainCard returnItemAtom={thisReturnItem} />;
  });

  // final UI output

  return noItems ? (
    uiScanItems
  ) : (
    <section className={`cardContainer itemsList`}>
      {uiItemCardTitle}
      {uiCardArr}
    </section>
  );
};

export { RtrnItemsList };
