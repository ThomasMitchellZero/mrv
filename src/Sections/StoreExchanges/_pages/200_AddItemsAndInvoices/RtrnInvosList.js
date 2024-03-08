import "./_AddItemsAndInvos.css";
import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useCentsToDollars } from "../../_resources/hooks/STRXhooks";
import {
  Invoice_SR,
  returnAtom,
} from "../../../../globalFunctions/globalJS_classes";

const RtrnInvosList = () => {
  const strxCtx = useOutletContext();
  const centsToDollars = useCentsToDollars();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const aSessionInvos = sessionState.sessionInvos;
  const aAtomizedItems = sessionState.atomizedReturnItems;

  // each item, whether it's a main item or a sub-item, will have a row.
  const itemRow = (rowItem) => {
    const refAtom = new returnAtom(rowItem);

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
      </div>
    );
  };

  /*
  
  
  const uiInvoItems = (thisInvo) => {
    const refInvo = new Invoice_SR(thisInvo);
    
    

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

  const uiItemCard = (returnItem) => {
    return (
      <div
        key={returnItem.atomItemNum}
        className={`cardStyle items_grid itemCard`}
      >
        {itemRow(returnItem)}
        <div className={'spacerCol'}></div>
      </div>
    );
  };


  */

  const uiItemCard = (invoice) => {
    const refInvo = new Invoice_SR(invoice);
    return (
      <div
        key={invoice.invoNum}
        className={`cardStyle items_grid itemCard`}
      ></div>
    );
  };

  const uiInvoCard = (invoObj) => {
    return (
      <div key={invoObj.invoNum} className={`cardStyle invos_grid itemCard`}>
        <div className={`receiptDetailsCol`}>
          <div className={`body__large bold`}># {invoObj.invoNum}</div>
          <div className={`body__small`}>Date: {invoObj.dateStr}</div>
          <div className={`body__small`}>Store: {invoObj.store}</div>
        </div>
        <div className={`columnTitleRow items_grid`}> </div>
        <div className={"spacerCol"}></div>
      </div>
    );
  };

  const uiInvoCardTitle = (
    <div className={`columnTitleRow invos_grid`}>
      <div className={`columnTitle receiptDetails`}>Invoice</div>
      <div className={`columnTitle invoItemDetails`}>Item</div>
      <div className={`columnTitle unitQty`}>Qty</div>
      <div className={`columnTitle unitPrice`}>Unit Price</div>
      <div className={`columnTitle unitIcon`}></div>
      <div className={`columnTitle spacer`}></div>
      <div className={`columnTitle trash`}></div>
    </div>
  );

  const aInvoCards = Object.values(aSessionInvos).map((returnItem) => {
    return uiInvoCard(returnItem);
  });

  return (
    <section className={`cardContainer invosList`}>
      {uiInvoCardTitle}
      {aInvoCards}
    </section>
  );
};

export { RtrnInvosList };
