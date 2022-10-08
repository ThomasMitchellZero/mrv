import classes from "./ScannedItemDetailCard.module.css";
import ProductBadge from "../components/UI/ProductBadge";

const ScannedItemDetailCard = (props) => {
  const product = props.product;

  const badges = product.categories.map((item)=>{
    return <ProductBadge key={item}>{item}</ProductBadge>
  })

  return (
    <div className={classes.card}>
      <img src={product.img} alt={product.description}></img>
      <div className={classes.textContainer}>
        <p className={classes.refnum}>
          {`Item # ${product.itemNum} \u00A0 \u00A0 Model # ${product.modelNum}`}
        </p>
        <p className="description">{product.description}</p>
        <div className={classes.badgeContainer}>
            {badges}
        </div>
      </div>
    </div>
  );
};

export default ScannedItemDetailCard;

/* 

    img: flowers_img,
    price: 4.99,
    itemNum: "450213",
    modelNum: "BB9FF1",
    description: "Phillipine white lillies with terra-cotta pot",
    categories: ["Live Goods"],

*/
