import { useOutletContext, useNavigate } from "react-router";
import { ProdClass } from "../globalFunctions/globalJS_classes";

import { useSwapGroupsArr, useSwapFilter } from "../Sections/Exchanges/_Resources/customHooks/exchHooks";

function useGroupAppointments() {
  const exchCtx = useOutletContext();
  const swapGroupArr = useSwapGroupsArr();
  const swapFilter = useSwapFilter();
  const setSessionSt = exchCtx.setExchSession;
  const itemsInExch = exchCtx.exchSession.itemsInExchange;
  const exchSwapGroups = exchCtx.exchSession.allSwapGroups;
  const defaultTime = exchCtx.exchSession.defaultValues.dvScheduledTime;

  return () => {
    let outShipmentsObj = {};
    let apptIndex = 1;
    let activeDC = null;

    for (const i of swapGroupArr) {
      if (
        swapFilter({
          targetSwap: i.thisSwapValue,
          mainItem: true,
          accessory: true,
        })
      ) {
        const thisItemPickupQty = i.thisSwapValue.returningItem.pickupQty;
        const thisItemDelivQty = i.thisSwapValue.replacementItem.deliveryQty;

        if (i.thisSwapkey === ProdClass({ mainItem: true })) {
          // sourcing all items from MainItem's DC because I am not dealing with this crap.
          activeDC =
            i.thisSwapValue.replacementItem.productDetails.dcLocations[0];
        }

        //Check if this DC code already exists in outShipmentsObj
        if (!outShipmentsObj[activeDC]) {
          outShipmentsObj[activeDC] = {
            appointmentIndex: apptIndex,
            apptItemKeys: [],
            totalApptPickupQty: 0,
            totalApptDeliveryQty: 0,
            timeSlot: "",
            apptTime: defaultTime,
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
        outShipmentsObj[activeDC].apptItemKeys.push(i);

        //increment its pickup and delivery qtys
        outShipmentsObj[activeDC].totalApptPickupQty += thisItemPickupQty;
        outShipmentsObj[activeDC].totalApptDeliveryQty += thisItemDelivQty;
      }
    }

    console.log(outShipmentsObj);
    setSessionSt((draft) => {
      draft.deliveryGroups = outShipmentsObj;
    });
  };
}

export { useGroupAppointments };
