import classes from "./GenericSOSmodal.module.css";

import { BaseModal } from "../../../../components/UI/PageLayout/Modal";
import TitleBar from "../../../../components/UI/PageLayout/TitleBar";

const GenericSOSmodal = () => {
  return (
    <BaseModal>
      <section className={classes.container}>
        <TitleBar />
      </section>
    </BaseModal>
  );
};

export default GenericSOSmodal;
