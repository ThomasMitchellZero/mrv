import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";
import { DeleteCardColMRV } from "../../../../../mrv/mrv-components/inputs/DeleteCardColMRV";
import { RtrnInvosCardLowInfo } from "./RtrnInvosCardLowInfo";
import { MdChevronRight, MdDeleteOutline, MdExpandLess, MdExpandMore } from "react-icons/md";
import {
  useSetSessionInvos,
  centsToDollars,
} from "../../../../../mrv/MRVhooks/MRVhooks";
import { ScanScreenMRV } from "../../../../../mrv/mrv-components/DisplayOutputs/ScanScreenMRV";
import {
  Invoice_SR,
  returnAtom,
  baseLocState,
  baseReturnState,
} from "../../../../../globalFunctions/globalJS_classes";




const RtrnInvosList = ({ parLocState, setParLocState }) => {

  const refSessionState = baseReturnState({});
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const setSessionInvosMRV = useSetSessionInvos();
  const locSt = sessionMRV.locSt;

  const aSessionInvos = sessionMRV.sessionInvos;

  const noInvos = Object.entries(aSessionInvos).length === 0;

  const uiScanInvos = (
    <ScanScreenMRV
      mainTitle="scan Or Enter Receipts"
      subtitle="Or press 'Items' tab to add items to the cart"
      iconStr="receiptLong"
    />
  );

  

  const uiInvoCardTitle = (
    <div className={`columnTitleRow invos_grid`}>
      <div className={`columnTitle receiptDetailsCol`}>Receipt #</div>
      <div className={`columnTitle invoItemDetailsCol`}>Items In Receipt</div>

      <div className={`columnTitle deleteCol`}>Receipt Total</div>
    </div>
  );

  const refInvos = new Invoice_SR({});
  const aInvoCards = Object.values(aSessionInvos).map((thisInvo) => {
    return <RtrnInvosCardLowInfo key={thisInvo.invoNum} invoice={thisInvo} />;
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

export { RtrnInvosList };
