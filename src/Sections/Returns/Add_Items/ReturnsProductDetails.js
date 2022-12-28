import classes from "./ReturnsProductDetails.module.css";

const ReturnsProductDetail = (props) => {
  const productData = props.productData;


  // products have an array containing their type.  This maps them.
  const productStatus = productData.categories.map((item) => {
    return (
      <div key={item} className={'product-status'}>
        {item}
      </div>
    );
  });

  return (
    <main className={classes.container}>
      <img
        src={productData.img}
        alt="test"
        className={classes.productImage}
      ></img>
      <section className={classes.vertical_container}>
        <section className={classes.numbers}>
          <h5>{`Item #${productData.itemNum}`}</h5>
          <div className="text-spacer" />
          <h5>{`Model #${productData.modelNum}`}</h5>
        </section>
        <div className={classes.product_description}>
          <p>{productData.description}</p>
        </div>
        <div className={classes.status_container}>{productStatus}</div>
      </section>
    </main>
  );
};

export default ReturnsProductDetail;
