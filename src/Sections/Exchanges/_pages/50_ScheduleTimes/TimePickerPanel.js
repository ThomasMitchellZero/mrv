import classes from "./TimePickerPanel.module.css";

function TimePickerPanel({ localSt, setLocSt }) {
  return (
    <section className={` ${classes.container}`}>
      <section className={` ${classes.buttonWindow}`}></section>
    </section>
  );
}

export { TimePickerPanel };
