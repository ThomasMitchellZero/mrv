import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import {
  centsToDollars,
  atomsMonetizer,
  centStringifier,
  useSetSessionItems,
} from "../../../../../mrv/MRVhooks/MRVhooks";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import { greenify } from "../../../../../mrv/MRVhooks/MRVhooks";
import { DeleteCardColMRV } from "../../../../../mrv/mrv-components/inputs/DeleteCardColMRV";
import { returnAtom } from "../../../../../globalFunctions/globalJS_classes";

import { cloneDeep } from "lodash";

const RtrnItemsMainCard = ({ returnItemAtom }) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setSessionItems = useSetSessionItems();

  const aReturnItems = sessionMRV.returnItems;
  const aAtomizedItems = sessionMRV.atomizedReturnItems;

  const childrenOfMainItem = aReturnItems.filter((thisAtom) => {
    return thisAtom.parentKey === returnItemAtom.atomItemNum;
  });

  const aMainPlusChildren = [returnItemAtom, ...childrenOfMainItem];

  const aAtomsOfCard = aAtomizedItems.filter((thisSubAtom) => {
    return (
      thisSubAtom.atomItemNum === returnItemAtom.atomItemNum ||
      thisSubAtom.atomItemNum === returnItemAtom.parentKey
    );
  });

  const cardTotalVal = atomsMonetizer(aAtomsOfCard).unitTotal;
  const cardBaseValue = cardTotalVal.unitBaseValue;

  const cardString = centStringifier({
    valueInCents: cardTotalVal,
  });

  // local function for handling qty changes.
  const handleQtyChange = (e, atomizedItem) => {
    const newQty = e.target.value;
    setSessionItems({
      itemsArrRouteStr: "returnItems",
      itemAtom: atomizedItem,
      newQty: newQty,
      actionType: "edit",
    });
  };

  ///////////////////////////////////////////////////////////////////
  //                     Row for each invoiced Item.
  ///////////////////////////////////////////////////////////////////

  const uiInfoRow = (atomizedItem) => {
    const hasInvo = atomizedItem.atomInvoNum;
    const moneyObj = atomizedItem.atomMoneyObj;

    const unitBaseValue = moneyObj.unitBaseValue;
    const totalValue = unitBaseValue * atomizedItem.atomItemQty;
    const oVals = {
      invo: hasInvo ? `#${atomizedItem.atomInvoNum}` : "Needs Receipt",
      red: hasInvo ? "" : "color__red__text",
      unitVal: hasInvo ? `$${centsToDollars(unitBaseValue)}` : "- -",
      totalVal: hasInvo ? `$${centsToDollars(totalValue)}` : "- -",
    };

    // greenify neg. values because they are stored as positive in the invoices.
    return (
      <div key={atomizedItem.primaryKey} className={`invoInfoRow`}>
        <div className={`body__small field receiptCol ${oVals.red}`}>
          {`${oVals.invo}`}
        </div>
        <div className={`unitQtyCol field body keepSpace ${oVals.red}`}>
          {`${atomizedItem.atomItemQty}   x`}
        </div>
        <div
          className={`unitPriceCol field body alignRight ${greenify(
            unitBaseValue
          )}`}
        >
          {oVals.unitVal}
        </div>
        <div
          className={`totalPriceCol field alignRight body bold ${greenify(
            totalValue
          )}`}
        >
          {oVals.totalVal}
        </div>
      </div>
    );
  };

  ///////////////////////////////////////////////////////////////////
  //                     Tile for an item.
  ///////////////////////////////////////////////////////////////////

  const uiItemTile = (tileItemAtom) => {
    const refAtom = new returnAtom({});

    const handleClick = (event) => {
      //FIX WITH SHARED LOCAL STATE
    };

    const activeClass = ""; // FIX WITH SHARED LOCAL STATE

    const aInfoRows = aAtomizedItems.filter((thisSubAtom) => {
      return thisSubAtom.atomItemNum === tileItemAtom.atomItemNum;
    });

    const aInfoRowsUI = aInfoRows.map((thisSubAtom) => {
      return uiInfoRow(thisSubAtom);
    });

    return (
      <div
        key={tileItemAtom.atomItemNum}
        className={`itemRow subCardStyle ${activeClass}`}
        onClick={(e) => handleClick(e)}
      >
        <div className={"rowCol detailCol"}>
          <MRVitemDetails
            showPrice={false}
            showQty={false}
            thisItemAtom={tileItemAtom}
          />
        </div>
        <div className={"rowCol totalQtyCol"}>
          <MRVinput>
            <input
              type="number"
              value={tileItemAtom.atomItemQty}
              onChange={(event) => {
                handleQtyChange(event, tileItemAtom);
              }}
            />
          </MRVinput>
        </div>
        <div className={`invoInfoColumn`}>{aInfoRowsUI}</div>
      </div>
    );
  };

  ///////////////////////////////////////////////////////////////////
  //                 Card for the item and its children
  ///////////////////////////////////////////////////////////////////

  // get the total $ value of the card.



  const aCardTiles = aMainPlusChildren.map((thisAtom) => {
    return uiItemTile(thisAtom);
  });

  // final UI output

  return (
    <div
      key={returnItemAtom.primaryKey}
      className={`cardStyle entryCard items_grid`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={"itemSubcardColumn field"}>{aCardTiles}</div>

      <div className={`deleteCol field`}>
        <DeleteCardColMRV
          bigValue={cardString}
          description={"Refund Value"}
          greenifyVal={cardTotalVal}
          onClick={() => {
            setSessionItems({
              itemAtom: returnItemAtom,
              actionType: "remove",
            });
          }}
        />
      </div>
    </div>
  );
};

export { RtrnItemsMainCard };
