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
  min=null,
  max=null,
  step=undefined,
  width = null,
  flex = null,
  onChange = null,
  value = undefined,
}) {
  const widthStyle = width ? { width: width } : {};
  const flexStyle = flex ? { flex: flex } : {};

  return (
    <section
      className={`${classes.container} ${
        hasError ? classes.error : null
      } ${extClasses}`}
      style={{ ...widthStyle, ...flexStyle }}
    >
      <input
        type={type}
        autoFocus={autoFocus}
        placeholder={placeholder}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        aria-invalid="true"
      ></input>
      {helperText ? (
        <p className={`body__small ${disabled ? classes.disabled : null}`}>
          {helperText}
        </p>
      ) : null}
    </section>
  );
}

export { MRVinput };

/*

*/
