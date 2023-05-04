import classes from "./TimeMiniCard.module.css";
import { MdDeleteOutline } from "react-icons/md";

function TimeMiniCard({ prodObj = {}, isActive = false }) {
  
  const time = prodObj.apptTime ? prodObj.apptTime : "";
  const product = prodObj.productDetails;

  return (
    <section
      className={`cardStyle ${isActive ? "selected" : ""} ${classes.container}`}
    >
      <img src={product.img} alt="test" className={classes.productImage} />
      <section className={`${classes.column}`}>
        <p className={`body__small`}>time</p>
      </section>
      <button type="button" className={`mrvBtn ghost`}>
        <MdDeleteOutline fontSize="1.5rem" />
      </button>
    </section>
  );
}

export { TimeMiniCard };
