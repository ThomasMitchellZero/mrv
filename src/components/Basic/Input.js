import classes from "./Input.module.css";

const Input = ({
  type,
  onChange,
  validity,
  placeholder,
  fieldValue,
  errorMessage,
}) => {
  let warningText = "";

  return (
    <section className={`${classes.container}`}>
      <input
        className={`base_input ${classes.container}`}
        type={type}
        onFocus={(warningText = "")}
        onBlur={validity ? (warningText = "") : (warningText = errorMessage)}
        onChange={onChange}
        placeholder={placeholder}
        value={fieldValue}
      />
      <p className={`warning-text`}>{warningText}</p>
    </section>
  );
};

export default Input;
