import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.baseButton} ${classes[props.buttonType]}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
