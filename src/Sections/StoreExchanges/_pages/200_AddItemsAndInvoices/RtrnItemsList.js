import "./_AddItemsAndInvos.css";
import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useCentsToDollars } from "../../../../mrv/MRVhooks/MRVhooks";
import { ScanScreenMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";

import { DeleteCardColMRV } from "../../../../mrv/mrv-components/inputs/DeleteCardColMRV";
import { returnAtom } from "../../../../globalFunctions/globalJS_classes";
import { useSetSessionItemsSTRX } from "../../_resources/hooks/STRXhooks";
import { cloneDeep } from "lodash";

const RtrnItemsList = ({ parLocState, setParLocState }) => {
  const strxCtx = useOutletContext();
  const centsToDollars = useCentsToDollars();
  const setSessionItemsSTRX = useSetSessionItemsSTRX();
  const sessionState = strxCtx.sessionSTRX;
  const aReturnItems = sessionState.returnItems;
  const aAtomizedItems = sessionState.atomizedReturnItems;

  const noItems = aReturnItems.length === 0;

  const aMainItems = aReturnItems.filter((returnItem) => {
    return !returnItem.parentKey;
  });

  // local function for handling qty changes.
  const handleQtyChange = (e, atomizedItem) => {
    const newQty = e.target.value;
    setSessionItemsSTRX({
      itemsArrRouteStr: "returnItems",
      itemAtom: atomizedItem,
      newQty: newQty,
      actionType: "edit",
    });
  };

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
      unitVal: hasInvo
        ? `$${centsToDollars(atomizedItem.atomMoneyObj.unitBaseValue)}`
        : "- -",
      totalVal: hasInvo
        ? `$${centsToDollars(
            atomizedItem.atomMoneyObj.unitBaseValue * atomizedItem.atomItemQty
          )}`
        : "- -",
    };

    return (
      <div key={atomizedItem.primaryKey} className={`invoInfoRow`}>
        <div className={`body__small field receiptCol ${oVals.red}`}>
          {`#${oVals.invo}`}
        </div>
        <div className={`unitQtyCol field body`}>
          {atomizedItem.atomItemQty}
        </div>
        <div className={`unitPriceCol field body alignRight`}>
          {oVals.unitVal}
        </div>
        <div className={`totalPriceCol field alignRight body bold`}>
          {oVals.totalVal}
        </div>
      </div>
    );
  };

  // a subcard for an item.
  const uiItemSubcard = (rowItem) => {
    const refAtom = new returnAtom({});
    const aInvoicedItems = aAtomizedItems.filter((atom) => {
      return atom.atomItemNum === rowItem.atomItemNum;
    });

    const aInfoRows = aInvoicedItems.map((thisAtom) => {
      return uiInfoRow(thisAtom);
    });

    const handleClick = () => {
      setParLocState((draft) => {
        draft.activeItemAtom = rowItem;
        draft.active30 = "ItemDetails30";
      });
    };

    const activeClass =
      rowItem.atomItemNum === parLocState?.activeItemAtom?.atomItemNum
        ? "selected"
        : "";

    return (
      <div
        key={rowItem.atomItemNum}
        className={`itemRow subCardStyle ${activeClass}`}
        onClick={handleClick}
      >
        <div className={"rowCol detailCol"}>
          <MRVitemDetails
            showPrice={false}
            showQty={false}
            thisItemAtom={rowItem}
          />
        </div>
        <div className={"rowCol totalQtyCol"}>
          <MRVinput>
            <input
              type="number"
              value={rowItem.atomItemQty}
              onChange={(event) => {
                handleQtyChange(event, rowItem);
              }}
            />
          </MRVinput>
        </div>
        <div className={`invoInfo`}>{aInfoRows}</div>
      </div>
    );
  };

  // a card for an item and its children.
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

        <div className={`deleteCol field`}>
          <DeleteCardColMRV
            onClick={() => {
              setSessionItemsSTRX({
                itemAtom: returnItem,
                actionType: "remove",
              });
            }}
          />
        </div>
      </div>
    );
  };

  // the title row for the item cards.
  const uiItemCardTitle = (
    <div className={`columnTitleRow items_grid`}>
      <div className={`columnTitle detailCol`}>Item</div>
      <div className={`columnTitle totalQtyCol`}>Total Qty</div>
      <div className={`columnTitle receiptCol`}>Receipt #</div>
      <div className={`columnTitle unitQtyCol`}>Qty</div>
      <div className={`columnTitle unitPriceCol`}>Unit Price</div>
    </div>
  );

  const uiCardArr = aMainItems.map((returnItem) => {
    return uiItemCard(returnItem);
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
