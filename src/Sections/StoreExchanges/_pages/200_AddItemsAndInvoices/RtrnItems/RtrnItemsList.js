import { useOutletContext } from "react-router";
import { useSetSessionItems } from "../../../../../mrv/MRVhooks/MRVhooks";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { RtrnItemsMainCard } from "./RtrnItemsMainCard";
import { DescriptorIcon } from "../../../../../mrv/mrv-components/DisplayOutputs/DescriptorIcon";

import { cloneDeep } from "lodash";

const RtrnItemsList = () => {
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
      <div className={`columnTitle invoInfoColumn`}>
        <div className={`columnTitle invoInfoRow merged`}>
          <DescriptorIcon
            iconStr="receiptLong"
            ctnrSize="1.5rem"
            fontSize="1rem"
            backgroundColor=""
          />
          Refund By Receipt
        </div>
      </div>
      <div className={`columnTitle trashCol`}>Return Value</div>
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
