import classes from "./ReturnsProductDetail.module.css";

const ReturnsProductDetail = (props) => {
  const productData = props.productData;

  /*
  
  400: {
    img: toilet_img,
    price: 8.75,
    itemNum: "400",
    modelNum: "RT3301",
    description: "American Standard Grand Duke II with Ultra-Flush",
    categories: ["Stock","Special Order"],
  },

  */

  const productStatus = productData.categories.map((item) => {
    return <div key={item} className={classes.product_status}>{item}</div>;
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
          {`Model #${productData.modelNum}`}
          <div style={{ width: "0.75rem" }} />
          {`Item #${productData.itemNum}`}
        </section>
        <div className={classes.product_description}>
          {productData.description}
        </div>
        <div className={classes.status_container}>{productStatus}</div>
      </section>
    </main>
  );
};

export default ReturnsProductDetail;
