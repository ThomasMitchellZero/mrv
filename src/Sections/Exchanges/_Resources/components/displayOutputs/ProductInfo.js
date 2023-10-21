import "./ProductInfo.css";

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

  ////CONFIGURABLE DEFAULT VALUES ////

  const configs={};

  let itemAndModelStr = `Item# ${rawProdDetails.itemNum}0123    Model# ${rawProdDetails.modelNum}`;

  let descriptionStr = `${rawProdDetails.description}`;

  let thisProdImg =
    rawProdDetails.prodClass === "mainItem" ? (
      <img src={rawProdDetails.img} alt="test" className={`productImage`} />
    ) : (
      <div className={`childImage`}>
        <MdSubdirectoryArrowRight
          fontSize="2.5rem"
          className={`color__tertiary__text`}
        />
      </div>
    );

  // Price is separate because it isn't always displayed.
  let priceStr = hasPrice
    ? `$${(rawProdDetails.price / 100).toFixed(2)}`
    : null;

  let qtyStr = qty ? `Qty: ${qty}` : null;



  return (
    <section className={`exchProdInfoCmpnt`}>
      {thisProdImg}
      <section className={`textColumn`}>
        <div className={`textRow`}>
          <p className={`body prodDescription`}>{priceStr}</p>
          <p className={`body prodDescription`}>{qtyStr}</p>
        </div>
        <p className={`tiny-text itemModel`}>{itemAndModelStr}</p>
        <p className={`body__small description`}>{descriptionStr}</p>
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
