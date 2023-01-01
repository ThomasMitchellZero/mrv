import classes from "./RL1LineField.module.css";


const RL_1LineField = ({
  RLstate,
  RLreducer,
  validLength,
  invalidMsg,
  fieldLabel,
  fieldPlaceholder,
}) => {
  const handleChange = (event) => {
    const inputText = event.target.value;
    const validity = inputText.length >= validLength;

    RLreducer({
      type: "CHANGE_INPUT",
      payload: {
        inputs: inputText,
        inputsValidity: validity,
        warningVisible: false,
      },
    });
  };

  const handleBlur = () => {
    RLreducer({
      type: "SHOW_WARNING",
      payload: !RLstate.inputsValidity,
    });
  };

  return (
    <section className={`${classes.container}`}>
      <h4>{fieldLabel}</h4>
      <input
        className={`base_input`}
        onChange={handleChange}
        value={RLstate.inputs}
        placeholder={fieldPlaceholder}
        onBlur={handleBlur}
      ></input>
      <p className={`warning-text`}>
        {RLstate.warningVisible ? invalidMsg : " "}
      </p>
      <button
        disabled={!RLstate.inputsValidity}
        className={`baseButton primary large`}
        type="submit"
      >
        Search
      </button>
    </section>
  );
};

export default RL_1LineField;
