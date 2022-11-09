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

  return (
    <main className={classes.container}>
      <img
        src={productData.img}
        alt="test"
        className={classes.productImage}
      ></img>
      <section className={classes.vertical_container}></section>
      <section>
        {productData.modelNum}
        <div style={{width:"1rem"}}/>
        {productData.itemNum}
      </section>
    </main>
  );
};

export default ReturnsProductDetail;
