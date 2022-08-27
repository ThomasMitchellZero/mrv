import classes from "./NavTab.module.css";

const NavTab = (props) => {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className={`${classes.navtab} ${props.active ? classes.active : ""}`}
    >
      {props.id}
    </button>
  );
};

export default NavTab;
