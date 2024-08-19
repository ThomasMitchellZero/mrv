import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import { DeleteCardColMRV } from "../../../../../mrv/mrv-components/inputs/DeleteCardColMRV";
import { RtrnInvosCardLowInfo } from "./RtrnInvosCardLowInfo";
import {
  MdChevronRight,
  MdDeleteOutline,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import {
  useSetSessionInvos,
  centsToDollars,
} from "../../../../../mrv/MRVhooks/MRVhooks";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import {
  Invoice_SR,
  returnAtom,
} from "../../../../../globalFunctions/globalJS_classes";


//// THIS IS NOT WORKING, I JUST NEED A PLACE TO STASH THIS STUFF SO I DON'T LOSE IT. /////

const RtrnInvosCardFull = ({ parLocState, setParLocState }) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setSessionInvosMRV = useSetSessionInvos();

  const aSessionInvos = sessionMRV.sessionInvos;

  const noInvos = Object.entries(aSessionInvos).length === 0;

  const uiScanInvos = (
    <ScanScreenMRV
      mainTitle="scan Or Enter Receipts"
      subtitle="Or press 'Items' tab to add items to the cart"
      iconStr="receiptLong"
    />
  );

  // a selectable subcard for an invo item.
  const uiItemSubcard = (invoAtom) => {
    const refInvo = new Invoice_SR({});
    const refAtom = new returnAtom({});

    const handleClick = (event) => {
      console.log("String Of Succcess");
      event.stopPropagation();
      // when clicked, set the active item to this item and show item details.

      setParLocState((draft) => {
        draft.activeItemAtom = invoAtom;
        draft.active30 = "ItemDetails30";
      });
    };

    const activeClass =
      invoAtom.atomItemNum === parLocState?.activeItemAtom?.atomItemNum
        ? "selected"
        : "";

    return (
      <div
        key={invoAtom.primaryKey}
        className={`subCardStyle invoItemSubcard ${activeClass}`}
        onClick={(e) => handleClick(e)}
      >
        <div className={`invoItemDetailsCol `}>
          <MRVitemDetails
            showPrice={false}
            showQty={false}
            thisItemAtom={invoAtom}
          />
        </div>
        <div
          className={`unitQtyCol field body keepSpace`}
        >{`${invoAtom.atomItemQty}   x`}</div>
        <div className={`unitPriceCol field body`}>
          ${centsToDollars(invoAtom.atomMoneyObj.unitBaseValue)}
        </div>
        <div className={`iconCol field`}>
          <MdChevronRight
            fontSize="2.5rem"
            className={`color__interactive__text`}
          />
        </div>
      </div>
    );
  };

  // a cluster of an invo item and its children, if any.

  const uiItemCluster = (invoAtom = new returnAtom({}), childrenArr = []) => {
    // in the card creation, we will pre-filter the children array to only include items that have the same parent key as the invoAtom.

    const outSubcardArr = [uiItemSubcard(invoAtom)];

    childrenArr.forEach((thisChild) => {
      outSubcardArr.push(uiItemSubcard(thisChild));
    });

    return (
      <div key={invoAtom.primaryKey} className={`invoItemCluster`}>
        {outSubcardArr}
      </div>
    );
  };

  // a card containing the invoice details, clusters of the items it contains, and their children, if any.
  const uiInvoCard = (invoObj) => {
    const aInvoProducts = invoObj.itemAtomsArr;
    // filter out any child items, since they will be displayed adjacent to their parent item.
    const mainItems = aInvoProducts.filter((thisAtom) => {
      return !thisAtom.parentKey;
    });

    const uiItemClusterArr = mainItems.map((thisMainItem) => {
      const aThisItemChildren = aInvoProducts.filter((thisAtom) => {
        return thisAtom.parentKey === thisMainItem.atomItemNum;
      });
      return uiItemCluster(thisMainItem, aThisItemChildren);
    });

    return (
      <div
        key={invoObj.invoNum}
        className={`cardStyle entryCard invos_grid`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`receiptDetailsCol`}>
          <div className={`body__large bold`}>{`# ${invoObj.invoNum}`}</div>
          <div className={`body__small`}>Date: {invoObj.dateStr}</div>
          <div className={`body__small`}>Store: {invoObj.store}</div>
        </div>
        <div className={`invoItemsColumn`}>{uiItemClusterArr}</div>

        <div className={`deleteCol field`}>
          <DeleteCardColMRV
            onClick={(e) => {
              setSessionInvosMRV({
                invosRtStr: "sessionInvos",
                invoNum: invoObj.invoNum,
                actionType: "remove",
              });
            }}
          />
        </div>
      </div>
    );
  };

  const uiInvoCardTitle = (
    <div className={`columnTitleRow invos_grid`}>
      <div className={`columnTitle receiptDetailsCol`}>Receipt #</div>
      <div className={`columnTitle invoItemDetailsCol`}>Items In Receipt</div>

      <div className={`columnTitle deleteCol`}>Receipt Total</div>
    </div>
  );

  const aInvoCards = Object.values(aSessionInvos).map((returnItem) => {
    return uiInvoCard(returnItem);
  });

  return noInvos ? (
    uiScanInvos
  ) : (
    <section className={`cardContainer invosList`}>
      {uiInvoCardTitle}
      {aInvoCards}
    </section>
  );
};

export { RtrnInvosCardFull };
