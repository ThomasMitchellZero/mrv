import "./_AddItemsAndInvos.css";
import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useCentsToDollars } from "../../_resources/hooks/STRXhooks";

const RtrnItemsList = () => {
  const strxCtx = useOutletContext();
  const centsToDollars = useCentsToDollars();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const aReturnItems = sessionState.returnItems;
  const aAtomizedItems = sessionState.atomizedReturnItems;

  const aMainItems = aReturnItems.filter((returnItem) => {
    return !returnItem.parentKey;
  });

  const uiInfoRow = (atomizedItem) => {
    const hasInvo = atomizedItem.atomInvoNum;
    const oVals = {
      invo: hasInvo ? atomizedItem.atomInvoNum : "Needs Receipt",
      red: hasInvo ? "" : "color__red__text",
      unitVal: hasInvo ? centsToDollars(atomizedItem.unitTotal) : "- -",
      totalVal: hasInvo
        ? centsToDollars(atomizedItem.unitTotal * atomizedItem.atomItemQty)
        : "- -",
    };

    return (
      <div key={atomizedItem.atomItemNum} className={`invoInfoRow`}>
        <div className={`body__small receiptCol ${oVals.red}`}>
          {oVals.invo}
        </div>
        <div className={`unitQtyCol body`}>{atomizedItem.atomItemQty}</div>
        <div className={`unitPriceCol body alignRight`}>{oVals.unitVal}</div>
        <div className={`totalPriceCol alignRight body__large bold `}>
          {oVals.totalVal}
        </div>
      </div>
    );
  };

  const itemRow = (rowItem) => {
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
    return (
      <div
        key={returnItem.atomItemNum}
        className={`cardStyle aiai_grid itemCard`}
      >
        {itemRow(returnItem)}
      </div>
    );
  };

  const uiCardArr = aMainItems.map((returnItem) => {
    return uiItemCard(returnItem);
  });

  return <section className={`cardContainer itemsList`}>{uiCardArr}</section>;
};

export { RtrnItemsList };
