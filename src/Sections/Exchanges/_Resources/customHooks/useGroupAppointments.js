import { useOutletContext, useNavigate } from "react-router";

function useGroupAppointments() {
  const exchCtx = useOutletContext();
  const setSessionSt = exchCtx.setExchSession;
  const itemsInExch = exchCtx.exchSession.itemsInExchange;
  console.log(itemsInExch);

  return () => {
    let outShipmentsObj = {};

    //for (const i of Object.keys(invoiceItemsRoute)) {

    for (const item of Object.keys(itemsInExch)) {
      const thisItemDC =
        itemsInExch[item].replacementItem.productDetails.dcLocations[0];

      //Check if this DC code already exists in outShipmentsObj
      if (!outShipmentsObj[thisItemDC]) {
        outShipmentsObj[thisItemDC] = [];
      }
      //add this item to the array of its DC
      outShipmentsObj[thisItemDC].push(item);
    }

    console.log(outShipmentsObj);
    setSessionSt((draft) => {
      draft.deliveryGroups = outShipmentsObj;
    });
  };
}

export { useGroupAppointments };
