import classes from "./HeaderTab.module.css";

const HeaderTab = (props) => {
  return <button className={`${classes.headertab} ${classes.active}`}>{props.children}</button>;
};

export default HeaderTab;
