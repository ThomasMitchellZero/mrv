import "./ProductInfo.css";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useCentsToDollars } from "../../../globalFunctions/globalFunctions";
import ProductContext from "../../../store/product-context";
import { useContext } from "react";
import { itemAtom } from "../../../globalFunctions/globalJS_classes";

// this should work from a completely standard product details object, since the actual product can be changed.

function ProductInfo({
  thisItemAtom = new itemAtom({}),
  hasPrice = false,
  qty = null,
}) {

  const productContext = useContext(ProductContext);

  const ctxItemInfo = productContext.productDetails[itemAtom.atomItemNum];

  // Need to be able to handle an empty item Obj.
  const centsToDollars = useCentsToDollars();



  let mainProd = (
    <img src={ctxItemInfo.img} alt="test" className={`productImage`} />
  );

  let childItem = (
    <MdSubdirectoryArrowRight
      fontSize="2.5rem"
      className={`color__tertiary__text`}
    />
  );


  ////CONFIGURABLE DEFAULT VALUES ////

  let configs = {
    activeImg: ctxItemInfo.img,
    itemAndModelStr: `Item# ${thisItemAtom.itemNum}0123    Model# ${ctxItemInfo.modelNum}`,
    descriptionStr: `${ctxItemInfo.description}`,
    priceStr: hasPrice || 80085,
    qtyStr: qty,
  };


  return (
    <section className={`exchProdInfoCmpnt`}>
      <div className={`prodImgBox`}>{configs.activeImg}</div>

      <section className={`textColumn`}>
        <div className={`textRow`}>
          <p className={`body prodDescription`}>{configs.priceStr}</p>
          <p className={`body prodDescription`}>{configs.qtyStr}</p>
        </div>
        <p className={`tiny-text itemModel`}>{configs.itemAndModelStr}</p>
        <p className={`body__small description`}>{configs.descriptionStr}</p>
      </section>
    </section>
  );
}

export { ProductInfo };

/*


*/

/*



*/
