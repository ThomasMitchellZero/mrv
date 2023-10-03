import classes from "./ProductInfo.module.css";

import { MdSubdirectoryArrowRight } from "react-icons/md";

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
    lpp: {},
  };

  // Price is separate because it isn't always displayed.
  const price = hasPrice ? (
    <p className={`body ${classes.description}`}>{`$${(
      rawProdDetails.price / 100
    ).toFixed(2)}`}</p>
  ) : null;

  // itemQty is separate because it isn't always displayed.  The source can also vary.
  const itemQty = qty ? (
    <p className={`body ${classes.description}`}>{`Qty: ${qty}`}</p>
  ) : null;

  const prodImg = isChild ? (
    ""
  ) : (
    <img src={rawProdDetails.img} alt="test" className={classes.productImage} />
  );

  return (
    <section className={`${classes.container}`}>
      {prodImg}
      <section className={`${classes.textColumn}`}>
        <div className={`${classes.textRow}`}>
          {price}
          {itemQty}
        </div>

        <p
          className={`tiny-text ${classes.itemModel}`}
        >{`Item# ${rawProdDetails.itemNum}0123    Model# ${rawProdDetails.modelNum}`}</p>
        <p
          className={`body__small ${classes.description}`}
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
