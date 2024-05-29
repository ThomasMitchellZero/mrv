import "./mrvItemDetails.css";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useCentsToDollars } from "../../MRVhooks/MRVhooks";
import ProductContext from "../../../store/product-context";
import { useContext } from "react";
import { returnAtom } from "../../../globalFunctions/globalJS_classes";

// this should work from a completely standard product details object, since the actual product can be changed.

function MRVitemDetails({
  thisItemAtom = new returnAtom({ atomItemNum: "noProduct" }),
  showPrice = true,
  priceInCents = undefined,
  showQty = true,
  qty = undefined,
  underArr = [],
  underArrWithContainer = null,
}) {
  const productContext = useContext(ProductContext);
  const centsToDollars = useCentsToDollars();

  const ctxItemInfo = productContext[thisItemAtom.bifrostKey];

  // price is normally the unitTotal, but if priceInCents is passed, it will use that instead
  const priceStr =
    showPrice && priceInCents
      ? `$ ${centsToDollars(priceInCents)}`
      : showPrice
      ? `$ ${centsToDollars(thisItemAtom.atomMoneyObj.unitTotal)}`
      : null;

  // qty is normally the atomItemQty, but if qty is passed, it will use that instead
  const qtyStr =
    showQty && qty
      ? `Qty: ${qty}`
      : showQty
      ? `Qty: ${thisItemAtom.atomItemQty}`
      : null;

  const itemAndModelStr = `Item# ${thisItemAtom.atomItemNum}    Model# ${ctxItemInfo.modelNum}`;

  ////CONFIGURABLE DEFAULT VALUES ////

  return (
    <section className={`mrvProdInfo`}>
      <div className={`prodImgBox`}>
        <img src={ctxItemInfo.img} alt="test" className={`productImage`} />
      </div>

      <section className={`textColumn`}>
        <div className={`textRow`}>
          <div className={`body prodDescription`}>{priceStr}</div>
          <div className={`body prodDescription`}>{qtyStr}</div>
        </div>
        <div className={`tinyText itemModel`}>{itemAndModelStr}</div>
        <div className={`body__small description`}>
          {ctxItemInfo.description}
        </div>
        <div className={`underArr`}>{underArr}</div>
        {underArrWithContainer}
      </section>
    </section>
  );
}

export { MRVitemDetails };

/*


*/

/*



*/
