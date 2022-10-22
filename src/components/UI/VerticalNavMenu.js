import classes from "./VerticalNavMenu.module.css";

const VerticalNavMenu = (props) => {
  return (
    <section className={classes.verticalnavmenu}>
      {props.children}
    </section>
  );
};

export default VerticalNavMenu;
