import classes from "./HeaderTab.module.css";

const HeaderTab = (props) => {
  return (
    <button
      id={props.drr}
      onClick={props.onClick}
      className={`${classes.headertab} ${props.active ? classes.active : ""}`}
    >
      {props.id}
    </button>
  );
};

export default HeaderTab;
