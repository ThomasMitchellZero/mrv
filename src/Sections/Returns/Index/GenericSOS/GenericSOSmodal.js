import classes from "./GenericSOSmodal.module.css";

import { BaseModal } from "../../../../components/UI/PageLayout/Modal";
import TitleBar from "../../../../components/UI/PageLayout/TitleBar";
import { MdOutlineClose, MdArrowBack } from "react-icons/md";

const GenericSOSmodal = ({ returnsContext, referenceObj }) => {
  return (
    <BaseModal>
      <section className={classes.container}>
        <section className={classes.title}>
          <button>
            <MdOutlineClose />
          </button>
          <h4>
            Invoice contains multiple items with same item #. Enter quantities
            being returned.
          </h4>
        </section>
      </section>
    </BaseModal>
  );
};

export default GenericSOSmodal;
