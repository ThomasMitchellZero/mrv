import "./mrvItemDetails.css";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useCentsToDollars } from "../../MRVhooks/MRVhooks";
import ProductContext from "../../../store/product-context";
import { useContext } from "react";
import { returnAtom } from "../../../globalFunctions/globalJS_classes";
import { ProductImageMRV } from "./ProductImageMRV";

// this should work from a completely standard product details object, since the actual product can be changed.

function MRVitemDetails({
  thisItemAtom = new returnAtom({ atomItemNum: "noProduct" }),
  showPrice = true,
  priceInCents = thisItemAtom.atomMoneyObj.unitTotal || undefined,
  showQty = true,
  qty = thisItemAtom.atomItemQty || undefined,
  underArr = [],
  underArrWithContainer = null,
}) {
  if (thisItemAtom.atomItemNum === "noProduct") {
    console.log("no product passed to MRVitemDetails");
  }
  const productContext = useContext(ProductContext);
  const centsToDollars = useCentsToDollars();

  const ctxItemInfo = productContext[thisItemAtom.bifrostKey];

  // price is normally the unitTotal, but if priceInCents is passed, it will use that instead
  const priceStr =
    showPrice && priceInCents ? `$${centsToDollars(priceInCents)}` : null;

  // qty is normally the atomItemQty, but if qty is passed, it will use that instead
  const qtyStr = showQty && qty ? `${qty}      x` : null;

  const itemAndModelStr = `Item# ${thisItemAtom.atomItemNum}    Model# ${ctxItemInfo.modelNum}`;

  ////CONFIGURABLE DEFAULT VALUES ////

  /*
  
  */

  return (
    <section className={`mrvProdInfo`}>
      <ProductImageMRV itemAtom={thisItemAtom} size="L" />

      <section className={`textColumn`}>
        <div className={`textRow`}>
          <div className={`body prodDescription`}>{qtyStr}</div>
          <div className={`body prodDescription`}>{priceStr}</div>
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
