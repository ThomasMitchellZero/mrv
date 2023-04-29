import classes from "./TimeMiniCard.module.css";
import { MdDeleteOutline } from "react-icons/md";


function TimeMiniCard({ prodObj = {} }) {
  const time = prodObj.apptTime;
  const product = prodObj.productDetails;

  return (
    <section className={`${classes.container}`}>
      <img src={product.img} alt="test" className={classes.productImage} />
      <section className={`${classes.column}`}>
        <p className={`body__small`}>{"time"}</p>
      </section>
      <button type="button" className={`mrvBtn ghost`}>
            <MdDeleteOutline fontSize="1.5rem" />
          </button>
    </section>
  );
}

export { TimeMiniCard };
