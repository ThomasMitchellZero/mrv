import classes from "./ProductInfo.module.css";

function ProductInfo({ itemObj, hasPrice = false }) {
  const productDetails = itemObj.productDetails;

  const price = hasPrice ? (
    <p className={`body ${classes.description}`}>{`$${
      itemObj.price / 100
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
        >{`Item# ${productDetails.itemNum}    Model# ${productDetails.modelNum}`}</p>
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
