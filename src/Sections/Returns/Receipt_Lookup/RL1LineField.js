import classes from "./RL1LineField.module.css";

const RL_1LineField = ({
  RLstate,
  RLreducer,
  validLength,
  searchType,
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
    const nextPayload =
      RLstate.inputs.length === 0 ? false : !RLstate.inputsValidity;

    RLreducer({
      type: "SHOW_WARNING",
      payload: nextPayload,
    });
  };

  return (
    <section className={`${classes.container}`}>
      <h4>{`Enter ${searchType} number to find invoices`}</h4>
      <input
        className={`base_input`}
        onChange={handleChange}
        value={RLstate.inputs}
        placeholder={searchType}
        onBlur={handleBlur}
      ></input>
      <p className={`warning-text`}>
        {RLstate.warningVisible ? `Enter valid ${searchType} number` : " "}
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
