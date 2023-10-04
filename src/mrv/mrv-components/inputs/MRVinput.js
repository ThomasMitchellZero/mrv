import classes from "./MRVinput.module.css";

function MRVinput({
  children,
  helperText = "",
  hasError = false,
  extClasses = "", //populate with a template literal, usual pattern.
  disabled = false,
  width = null,
  flex = null,
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
      {
        children /* Put an Input container as a child b/c I am not passing 8 billion props from the parent by hand. */
      }
      {helperText ? (
        <p
          className={`body__small color__tertiary__text ${
            disabled ? classes.disabled : null
          }`}
        >
          {helperText}
        </p>
      ) : null}
    </section>
  );
}

export { MRVinput };

/*

*/
