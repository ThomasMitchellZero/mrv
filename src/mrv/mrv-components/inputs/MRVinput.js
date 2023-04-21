import classes from "./MRVinput.module.css";

function MRVinput({
  label = "label",
  type = "",
  helperText = "Helper",
  status = "active",
  autoFocus = false,
  placeholder = "",
  extClasses = "",  //populate with a template literal, usual pattern.
  onChange = () => {},
  value = "",
}) {

  const statusObj = {
    active: {},
    inactive: {},
    error: {},
  };

  return (
    <section className={`${classes.container} ${classes[status]} ${extClasses}`}>
      <input
        type={type}
        autoFocus={autoFocus}
        placeholder={placeholder}
        label={label}
        /*
        onChange={() => onChange}
        value={value}
         */


      ></input>
      <p className={`body__small ${classes.helperText}`}>{helperText}</p>
    </section>
  );
}

export { MRVinput };
