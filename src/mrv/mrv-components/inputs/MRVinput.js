import "./MRVinput.css"

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

  //PROBLEM: I need to reorganize how the "error" and "disabled" classes are handled in the CSS file.

  return (
    <section
      className={`mrvInputCtnr ${
        hasError ? "error" : ""
      } ${extClasses}`}
      style={{ ...widthStyle, ...flexStyle }}
    >
      {
        children /* Put an Input container as a child b/c I am not passing 8 billion props from the parent by hand. */
      }
      {helperText ? (
        <p
          className={`body__small color__tertiary__text ${
            disabled ? "disabled" : ""
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
