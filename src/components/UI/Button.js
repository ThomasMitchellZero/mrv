import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.baseButton} ${props.className} ${classes[props.buttonType]} ${classes[props.buttonSize]}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
