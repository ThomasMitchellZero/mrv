import "./ProductInfo.css";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useSwapFilter } from "../../customHooks/exchHooks";

// this should work from a completely standard product details object, since the actual product can be changed.

function ProductInfo({
  itemObj,
  hasPrice = false,
  qty = null,
  config = null,
  isChild = false,
}) {
  const rawProdDetails = itemObj.productDetails;

  const configObj = {
    mainItem: {
      imgSrc: (
        <img src={rawProdDetails.img} alt="test" className={`productImage`} />
      ),
    },
    childClass: {
      imgSrc: (
        <MdSubdirectoryArrowRight
          fontSize="2.5rem"
          className={`color__green__text`}
        />
      ),
    },
    empty: {},
  };

  // Price is separate because it isn't always displayed.
  const price = hasPrice ? (
    <p className={`body prodDescription`}>{`$${(
      rawProdDetails.price / 100
    ).toFixed(2)}`}</p>
  ) : null;

  // itemQty is separate because it isn't always displayed.  The source can also vary.
  const itemQty = qty ? (
    <p className={`body prodDescription`}>{`Qty: ${qty}`}</p>
  ) : null;

  // probably move this tomorrow.
  const prodImg = isChild ? (
    <div className={`childImage`}>
      <MdSubdirectoryArrowRight
        fontSize="2.5rem"
        className={`color__green__text`}
      />
    </div>
  ) : (
    <img src={rawProdDetails.img} alt="test" className={`productImage`} />
  );

  return (
    <section className={`exchProdInfoCmpnt`}>
      {prodImg}
      <section className={`textColumn`}>
        <div className={`textRow`}>
          {price}
          {itemQty}
        </div>

        <p
          className={`tiny-text itemModel`}
        >{`Item# ${rawProdDetails.itemNum}0123    Model# ${rawProdDetails.modelNum}`}</p>
        <p
          className={`body__small description`}
        >{`${rawProdDetails.description}`}</p>
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

200: { 
    quantity: 1, 
    price: 463, 
    tax: 41, 
    rawProdDetails: {img: frontload_washer_img,
        price: 76600,
        itemNum: "910",
        modelNum: "SFL456",
        description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
        categories: ["Stock","Delivery"],
        specialCategories: {SOS:true},
        restockFee: 0.2,
        inStock: 2,
    },
 }



*/
