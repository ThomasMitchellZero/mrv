import classes from "./ProductInfo.module.css";

function ProductInfo({ itemObj }) {
  const productDetails = itemObj.productDetails;

  return (
    <section className={`${classes.container}`}>
      <img
        src={productDetails.img}
        alt="test"
        className={classes.productImage}
      />
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
    },
 }



*/
