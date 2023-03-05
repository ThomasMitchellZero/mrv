import classes from "./GenericSOSmodal.module.css";

import { BaseModal } from "../../../../components/UI/PageLayout/Modal";
import TitleBar from "../../../../components/UI/PageLayout/TitleBar";
import Table from "../../../../components/UI/Table/Table"
import TableHeading from "../../../../components/UI/Table/TableHeading";


import { MdOutlineClose, MdArrowBack } from "react-icons/md";

const GenericSOSmodal = ({ returnsContext }) => {
  //Returns context
  const activeModalRefObj = returnsContext.session.activeModal.refObj;
  const dispatchReturns = returnsContext.dispatchSession;

  // ---- SUB-ITEMS TABLE ----
  const productsRef = {
    10001: { quantity: 2, price: 7766, tax: 720, delivery: "delivered" },
    10002: { quantity: 6, price: 234, tax: 22, delivery: "delivered" },
    10003: { quantity: 3, price: 6012, tax: 601, delivery: "delivered" },
  };

  const refTableH = <TableHeading />

  const tableHeadingArr = [
    { id: "Description", active: false, flexing: "10%" },
    { id: "Status", active: false, flexing: "10%" },
    { id: "Per Unit $", active: false, flexing: "10%" },
    { id: "Quantity", active: false, flexing: "10%" },
  ];



  return (
    <BaseModal>
      <section className={classes.container}>
        <section className={classes.title}>
          <button
            className={`baseIconButton medium`}
            onClick={() => {
              dispatchReturns({
                type: "SET_MODAL",
                payload: null,
              });
            }}
          >
            <MdOutlineClose size="100%" className={`grey-08-text`} />
          </button>
          <h4 className={`grey-08-text`}>
            Invoice contains multiple items with same item #. Enter quantities
            being returned.
          </h4>
        </section>
        <Table tableHeadingArray={tableHeadingArr}></Table>
      </section>
    </BaseModal>
  );
};

export default GenericSOSmodal;
