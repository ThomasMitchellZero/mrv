import classes from "./ProductInfo.module.css";

// this should work from a completely standard product details object, since the actual product can be changed.

function ProductInfo({ itemObj, hasPrice = false, hasQty = true }) {

  const productDetails = itemObj.productDetails;

  // Qty needs to be variable and needs to come from the outside, since the var name might be different.  Do tomorrow.

  const price = hasPrice ? (
    <p className={`body ${classes.description}`}>{`$${
      (productDetails.price / 100).toFixed(2)
    }`}</p>
  ) : null;

  return (
    <section className={`${classes.container}`}>
      <img
        src={productDetails.img}
        alt="test"
        className={classes.productImage}
      />
      <section className={`${classes.textColumn}`}>
        {price}
        <p
          className={`tiny-text ${classes.itemModel}`}
        >{`Item# ${productDetails.itemNum}0123    Model# ${productDetails.modelNum}`}</p>
        <p
          className={`body__small ${classes.description}`}
        >{`${productDetails.description}`}</p>
      </section>
    </section>
  );
}

export { ProductInfo };

/*

200: { 
    quantity: 1, 
    price: 463, 
    tax: 41, 
    productDetails: {img: frontload_washer_img,
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
