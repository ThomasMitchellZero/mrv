import classes from "./Modal.module.css";

import TitleBar from "./TitleBar";

const BaseModal = ({ children }) => {
  return (
    <section className={classes.container}>
      <section className={classes.window}>{children}</section>
    </section>
  );
};

const StandardModal = ({ children, barTitle, right_onClick }) => {
  return (
    <BaseModal>
      <TitleBar
        title={barTitle}
        righticon="close"
        right_onClick={right_onClick}
      />
      {children}
    </BaseModal>
  );
};

export { BaseModal, StandardModal };
