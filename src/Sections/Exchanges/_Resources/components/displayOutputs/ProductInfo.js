import "./ProductInfo.css";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useCentsToDollars } from "../../customHooks/exchHooks";

// this should work from a completely standard product details object, since the actual product can be changed.

function ProductInfo({
  itemObj,
  hasPrice = false,
  qty = null,
  allDelivered = false,
}) {
  // Need to be able to handle an empty item Obj.
  const rawProdDetails = itemObj?.productDetails ?? {};
  const centsToDollars = useCentsToDollars();

  let mainProd = (
    <img src={rawProdDetails.img} alt="test" className={`productImage`} />
  );

  let childItem = (
    <MdSubdirectoryArrowRight
      fontSize="2.5rem"
      className={`color__tertiary__text`}
    />
  );

  let greenCheck = (
    <MdSubdirectoryArrowRight
      fontSize="2.5rem"
      className={`color__tertiary__text`}
    />
  );

  ////CONFIGURABLE DEFAULT VALUES ////

  let configs = {
    itemAndModelStr: `Item# ${rawProdDetails.itemNum}0123    Model# ${rawProdDetails.modelNum}`,
    descriptionStr: `${rawProdDetails.description}`,
    priceStr: hasPrice,
    qtyStr: qty,
  };

  // Automatic assignments to configs
  configs.priceStr &&= `$${centsToDollars(rawProdDetails.price)}`;
  configs.qtyStr &&= `Qty: ${qty}`;
  configs.activeImg =
    rawProdDetails.prodClass === "mainItem" ? mainProd : childItem;

  // Conditional Assignment from args.
    // Will need eventually, but not yet.
  

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

function LPPproductInfo({ itemObj, hasPrice = false, qty = null }) {
  let newItemObj = itemObj;
  return <ProductInfo itemObj={newItemObj} hasPrice={hasPrice} qty={qty} />;
}

export { LPPproductInfo };

*/

/*

// Maybe delete??
  const imgObj = {
    mainProd: (
      <img src={rawProdDetails.img} alt="test" className={`productImage`} />
    ),
    childItem: (
      <MdSubdirectoryArrowRight
        fontSize="2.5rem"
        className={`color__tertiary__text`}
      />
    ),
    allDelivered: (
      <MdSubdirectoryArrowRight
        fontSize="2.5rem"
        className={`color__tertiary__text`}
      />
    ),
  };

*/
