import classes from "./MiniItemLI.module.css";



const MiniUnmatchedLI = ({ unmatchedObj, hasMessage = false }) => {


  return (
    <section className={`divider-bottom ${classes.container}`}>
      <section className={classes.mainColumn}>
        <div className={classes.alertMsg}>{hasMessage.content}</div>
        <div><h5>{`Item # ${unmatchedObj.itemNum}     Model # ${unmatchedObj.modelNum}`}</h5></div>
        <p>{unmatchedObj.description}</p>
        <h4>{`$ ${unmatchedObj.price.toFixed(2)}`}</h4>
      </section>
      <section className={classes.secondColumn}></section>
    </section>
  );
};

export default MiniUnmatchedLI;
