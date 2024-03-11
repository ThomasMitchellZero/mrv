import "./_AddItemsAndInvos.css";
import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useCentsToDollars } from "../../_resources/hooks/STRXhooks";
import { ScanScreenMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { MdDeleteOutline } from "react-icons/md";

const RtrnItemsList = () => {
  const strxCtx = useOutletContext();
  const centsToDollars = useCentsToDollars();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const aReturnItems = sessionState.returnItems;
  const aAtomizedItems = sessionState.atomizedReturnItems;

  const noItems = aReturnItems.length === 0;

  const aMainItems = aReturnItems.filter((returnItem) => {
    return !returnItem.parentKey;
  });

  // blank screen for no items.
  const uiScanItems = (
    <ScanScreenMRV
      mainTitle="scan Or Enter Items"
      subtitle="Or press 'Receipts' tab to enter receipts"
      imgStr="Cart"
    />
  );

  // a row for invoice-specific details of this item.
  const uiInfoRow = (atomizedItem) => {
    const hasInvo = atomizedItem.atomInvoNum;
    const oVals = {
      invo: hasInvo ? atomizedItem.atomInvoNum : "Needs Receipt",
      red: hasInvo ? "" : "color__red__text",
      unitVal: hasInvo ? `$${centsToDollars(atomizedItem.unitTotal)}` : "- -",
      totalVal: hasInvo
        ? `$${centsToDollars(
            atomizedItem.unitTotal * atomizedItem.atomItemQty
          )}`
        : "- -",
    };

    return (
      <div key={atomizedItem.primaryKey} className={`invoInfoRow`}>
        <div className={`body__small field receiptCol ${oVals.red}`}>
          {oVals.invo}
        </div>
        <div className={`unitQtyCol field body`}>
          {atomizedItem.atomItemQty}
        </div>
        <div className={`unitPriceCol field body alignRight`}>
          {oVals.unitVal}
        </div>
        <div className={`totalPriceCol field alignRight body__large bold`}>
          {oVals.totalVal}
        </div>
      </div>
    );
  };

  const uiItemSubcard = (rowItem) => {
    const aInvoicedItems = aAtomizedItems.filter((atom) => {
      return atom.atomItemNum === rowItem.atomItemNum;
    });

    const aInfoRows = aInvoicedItems.map((thisAtom) => {
      return uiInfoRow(thisAtom);
    });

    return (
      <div key={rowItem.atomItemNum} className={`itemRow cardStyle hasHover`}>
        <div className={"rowCol detailCol"}>
          <MRVitemDetails
            showPrice={false}
            showQty={false}
            thisItemAtom={rowItem}
          />
        </div>
        <div className={"rowCol totalQtyCol"}>
          <MRVinput>
            <input type="text" value={rowItem.totalQty} />
          </MRVinput>
        </div>
        <div className={`invoInfo`}>{aInfoRows}</div>
      </div>
    );
  };

  const uiItemCard = (returnItem) => {
    // look for associated child items.
    const aItemAndChildren = aReturnItems.filter((thisAtom) => {
      return thisAtom.parentKey === returnItem.atomItemNum;
    });
    // add the parent item to the beginning of the array.
    aItemAndChildren.unshift(returnItem);

    const outSubcardArr = aItemAndChildren.map((thisAtom) => {
      return uiItemSubcard(thisAtom);
    });

    return (
      <div
        key={returnItem.primaryKey}
        className={`cardStyle entryCard items_grid`}
      >
        <div className={"itemColumn field"}>{outSubcardArr}</div>
        <div className={"spacerCol field"}></div>
        <div className={`deleteCol field`}>
          <button className={`ghost fullWidth`}>
            <MdDeleteOutline
              fontSize="2.5rem"
              className={`color__interactive__text`}
            />
          </button>
        </div>
      </div>
    );
  };

  const uiItemCardTitle = (
    <div className={`columnTitleRow items_grid`}>
      <div className={`columnTitle detailCol`}>Item</div>
      <div className={`columnTitle totalQtyCol`}>Total Qty</div>
      <div className={`columnTitle receiptCol`}>Receipt</div>
      <div className={`columnTitle unitQtyCol`}>Qty</div>
      <div className={`columnTitle unitPriceCol`}>Unit Price</div>
    </div>
  );

  const uiCardArr = aMainItems.map((returnItem) => {
    return uiItemCard(returnItem);
  });

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
