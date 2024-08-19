import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import { DeleteCardColMRV } from "../../../../../mrv/mrv-components/inputs/DeleteCardColMRV";
import { BigLabeledValue } from "../../../../../mrv/mrv-components/DisplayOutputs/BigLabeledValue";
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

const RtrnInvosCardLowInfo = ({ invoice = new Invoice_SR({}) }) => {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setSessionInvosMRV = useSetSessionInvos();

  /*

    const uiInvoCard = (invoObj) => {
    const aInvoProducts = invoObj.itemAtomsArr;
    // filter out any child items, since they will be displayed adjacent to their parent item.
    const mainItems = aInvoProducts.filter((thisAtom) => {
      return !thisAtom.parentKey;
    });

      };
  
  
  */

  const refInvo = new Invoice_SR({});

  return (
    <div
      key={invoice.invoNum}
      className={`cardStyle entryCard invos_grid`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={`receiptDetailsCol`}>
        <div className={`body__large bold`}>{`# ${invoice.invoNum}`}</div>
        <div className={`body__small`}>Date: {invoice.dateStr}</div>
        <div className={`body__small`}>Store: {invoice.store}</div>
      </div>

      <div className={`invoItemsColumn`}>
        <div className={`mergedReceiptCol`}>
          <BigLabeledValue
            labelStr="Line Items"
            valueStr={`${invoice.itemAtomsArr.length}`}
          />
          <BigLabeledValue
            labelStr="Total Items"
            valueStr={`${invoice.totalItems}`}
          />
        </div>
      </div>

      <div className={`deleteCol field`}>
        <DeleteCardColMRV
          onClick={(e) => {
            setSessionInvosMRV({
              invosRtStr: "sessionInvos",
              invoNum: invoice.invoNum,
              actionType: "remove",
            });
          }}
        />
      </div>
    </div>
  );
};

export { RtrnInvosCardLowInfo };
