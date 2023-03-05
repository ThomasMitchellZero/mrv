import classes from "./GenericSOSmodal.module.css";

import { BaseModal } from "../../../../components/UI/PageLayout/Modal";
import TitleBar from "../../../../components/UI/PageLayout/TitleBar";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

const GenericSOSmodal = ({ returnsContext }) => {

  const activeModalRefObj = returnsContext.session.activeModal.refObj

  const dispatchReturns = returnsContext.dispatchSession;

  return (
    <BaseModal>
      <section className={classes.container}>
        <section className={classes.title}>
          <button className={`baseIconButton medium`}>
            <MdOutlineClose size="100%" className={`grey-08-text`} />
          </button>
          <h4 className={`grey-08-text`}>
            Invoice contains multiple items with same item #. Enter quantities
            being returned.
          </h4>
        </section>
      </section>
    </BaseModal>
  );
};

export default GenericSOSmodal;
