import InvoiceContext from "../../../store/invoice-context";
import ProductContext from "../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import cloneDeep from "lodash.clonedeep";

/*


*/

const useAddRtrnItem = () => {
  // add an item to the Returns state

  const returnsCtx = useOutletContext();
  const productContext = useContext(ProductContext);
  const dispatchRtrn = returnsCtx.dispatchSession;

  const clonedSessionItems = cloneDeep(returnsCtx.session.items);

  const addRtrnItem = ({ itemNum, itemQty }) => {
    const outQty = parseInt(itemQty);
    const outItemNum = itemNum;

    // Copy item if it already exists, otherwise create a new, empty one.
    const outItemObj = clonedSessionItems[outItemNum] ?? {
      ...productContext[outItemNum],
      quantity: 0,
      disposition: { unwanted: 0 },
    };

    // if item hasn't Unwanted dispo type, create it w/ value: 0
    outItemObj.disposition.unwanted ??= 0;

    // populate properties with new quantity.
    outItemObj.disposition.unwanted += outQty;
    outItemObj.quantity += outQty;

    const outItemPayload = {
      [outItemNum]: outItemObj,
    };

    dispatchRtrn({
      type: "ADD_ITEM",
      payload: outItemPayload,
    });
  };

  return addRtrnItem;
};

export { useAddRtrnItem };
