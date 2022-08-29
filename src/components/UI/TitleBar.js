import classes from "./TitleBar.module.css";



const TitleBar = (props) => {
  return (
    <div>
      <div className={classes.titlebar}>
        <div className={classes.iconholder}>{props.lefticon}</div>
        <p>{props.children}</p>
        <div className={classes.iconholder}>{props.righticon}</div>
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default TitleBar;
