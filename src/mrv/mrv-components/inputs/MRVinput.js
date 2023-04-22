import classes from "./MRVinput.module.css";

function MRVinput({
  label = "",
  type = "",
  helperText = "",
  hasError = false,
  autoFocus = false,
  placeholder = "",
  extClasses = "", //populate with a template literal, usual pattern.
  disabled = false,

  onChange = null,
  value = null,
}) {
  return (
    <section
      className={`${classes.container} ${
        hasError ? classes.error : null
      } ${extClasses}`}
    >
      <input
        type={type}
        autoFocus={autoFocus}
        placeholder={placeholder}
        label={label}
        value={value}
        onChange={() => onChange}
        disabled={disabled}
        aria-invalid="true"
      ></input>
      <p className={`body__small ${disabled ? classes.disabled : null}`}>
        {helperText}
      </p>
    </section>
  );
}

export { MRVinput };

/*

*/
