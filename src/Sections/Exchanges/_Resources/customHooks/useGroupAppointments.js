import { useOutletContext, useNavigate } from "react-router";

function useGroupAppointments() {
  const exchCtx = useOutletContext();
  const setSessionSt = exchCtx.setExchSession;
  const itemsInExch = exchCtx.exchSession.itemsInExchange;

  return () => {
    let outShipmentsObj = {};
    let apptIndex = 1;

    for (const item of Object.keys(itemsInExch)) {
      const thisItemPickupQty = itemsInExch[item].returningItem.pickupQty;
      const thisItemDelivQty = itemsInExch[item].replacementItem.deliveryQty;

      const thisItemDC =
        itemsInExch[item].replacementItem.productDetails.dcLocations[0];

      //Check if this DC code already exists in outShipmentsObj
      if (!outShipmentsObj[thisItemDC]) {
        outShipmentsObj[thisItemDC] = {
          appointmentIndex: apptIndex,
          apptItemKeys: [],
          totalApptPickupQty: 0,
          totalApptDeliveryQty: 0,
          apptTime: null,
          address: {
            street: "1600 Pennsylvania Avenue",
            addressStr: "Washington, DC 20001",
          },
          deliveryInstructions:
            "Leave it on the doorstep and get the hell outta here",
        };
        apptIndex++;
      }
      //add this item to the array of its DC
      outShipmentsObj[thisItemDC].apptItemKeys.push(item);

      //increment its pickup and delivery qtys
      outShipmentsObj[thisItemDC].totalApptPickupQty += thisItemPickupQty;
      outShipmentsObj[thisItemDC].totalApptDeliveryQty += thisItemDelivQty;
    }

    console.log(outShipmentsObj);
    setSessionSt((draft) => {
      draft.deliveryGroups = outShipmentsObj;
    });
  };
}

export { useGroupAppointments };
