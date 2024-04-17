import "./PriceDisplayMRV.css";

import {
  returnAtom,
  moneyObj,
} from "../../../globalFunctions/globalJS_classes";
import { greenify } from "../../MRVhooks/MRVhooks";

function PriceDisplayMRV({
  aPriceAtoms = [],
  showTaxedTotal = false,
  includeDiscounts = false,
}) {
  const refAtom = new returnAtom({});

  // if aPriceAtoms is not an array, put its value in an array and assign to const aPriceAtoms

  const priceAtomsArr = Array.isArray(aPriceAtoms)
    ? aPriceAtoms
    : [aPriceAtoms];

  // loop through priceAtomsArr and return the total price
  let outPrice = priceAtomsArr.reduce((acc, atom) => {
    const refMoneyObj = new moneyObj({});
    const thisMoneyObj = atom.atomMoneyObj;

    const priceToMultply = showTaxedTotal
      ? thisMoneyObj.unitTotal
      : thisMoneyObj.unitBaseValue;

    const atomValue = priceToMultply * atom.atomItemQty;
    return acc + atomValue;
  }, 0);

  return (
    <div className="PriceDisplayMRV">
      <div className="PriceDisplayMRV__price">
        <span className="PriceDisplayMRV__price__currency">$</span>
        <span className="PriceDisplayMRV__price__amount">0.00</span>
      </div>
      <div className="PriceDisplayMRV__price__description">Total Price</div>
    </div>
  );
}

export { PriceDisplayMRV };
