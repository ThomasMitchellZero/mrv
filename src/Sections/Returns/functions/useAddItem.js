import { useContext } from "react";
import ProductContext from "../../../store/product-context";

import cloneDeep from "lodash.clonedeep";

const useAddItem = ({ itemsToAddObj = {}, returnsContext = {} }) => {
  //context
  const sessionItems = cloneDeep(returnsContext.session.items);
  const productContext = useContext(ProductContext);

  //Output Obj being built.
  let outAllNewItems = {};

  const inputKeysArr = Object.keys(itemsToAddObj);

  for (const thisKey of inputKeysArr) {

    const thisItem = itemsToAddObj[thisKey];
    const outQty = parseInt(thisItem.quantity);

    // Copy item if it already exists, otherwise create a new, empty one.
    const outItemObj = sessionItems[thisKey] ?? {
      ...productContext[thisItem],
      quantity: 0,
      // if item hasn't Unwanted dispo type, create it w/ value: 0
      disposition: { unwanted: 0 },
    };

    outItemObj.disposition.unwanted ??= 0;

    // populate properties with new quantity.
    outItemObj.disposition.unwanted += outQty;
    outItemObj.quantity += outQty;

    outAllNewItems[thisKey] = outItemObj;
  }
  return outAllNewItems;
};

export { useAddItem };
