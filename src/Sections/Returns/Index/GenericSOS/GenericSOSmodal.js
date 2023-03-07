import classes from "./GenericSOSmodal.module.css";

import { BaseModal } from "../../../../components/UI/PageLayout/Modal";
import TitleBar from "../../../../components/UI/PageLayout/TitleBar";
import Table from "../../../../components/UI/Table/Table";
import TableHeading from "../../../../components/UI/Table/TableHeading";
import GenericSOSrow from "./GenericSOSrow";
import { useContext } from "react";

import ProductContext from "../../../../store/product-context";
import { addItem } from "../../functions/addItem";

import { useAddItem } from "../../functions/useAddItem";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";

import { MdOutlineClose, MdArrowBack } from "react-icons/md";

const GenericSOSmodal = ({ returnsContext }) => {
  //Returns context
  const dispatchReturns = returnsContext.dispatchSession;
  const productsCatalogCtx = useContext(ProductContext);

  // cloned Session context
  const sessionCtx = cloneDeep(returnsContext.session);
  const activeModalRefObj = sessionCtx.activeModal.refObj;
  const productsObj = activeModalRefObj.products;
  const productsArr = Object.entries(productsObj);

  // ---- LOCAL STATE ----
  // calculates default value for initial state.
  const makeInitialProductsObj = () => {
    const initialOutput = {};
    for (const thisProduct of productsArr) {
      const key = thisProduct[0];
      initialOutput[key] = { quantity: null };
    }
    return initialOutput;
  };

  const [modalState, setModalState] = useState({
    isValid: false,
    productsObj: makeInitialProductsObj(),
  });

  // ---- SHARED FUNCTIONS ----

  const outSessionItemsObj = addItem({
    itemsToAddObj: modalState.productsObj,
    returnsItems: sessionCtx.items,
    productContext: productsCatalogCtx,
  });

  const inputQtyChange = (event, itemNum, max) => {
    // process user input
    const rawIn = event.target.value;
    const input = parseInt(rawIn);
    let outQty =
      input > max // if Input is too big
        ? max
        : !input // if Input is falsy
        ? null
        : input;

    const outProductsObj = {
      ...modalState.productsObj,
      [itemNum]: { quantity: outQty },
    };

    // evaluate form validity
    let outIsValid = false;
    // loop through all quantities.  If any are truthy, form is valid.
    for (const thisStateProduct in Object.values(outProductsObj)) {
      if (thisStateProduct.quantity) {
        outIsValid = true;
        break;
      }
    }

    setModalState({
      ...modalState,
      isValid: outIsValid,
      productsObj: outProductsObj,
    });
  };
  // ---- ITEMS TABLE ----

  const refTableH = <TableHeading />;

  const tableHeadingArr = [
    { id: "Description", active: false, flexing: "10%" },
    { id: "Status", active: false, flexing: "10%" },
    { id: "Per Unit $", active: false, flexing: "10%" },
    { id: "Quantity", active: false, flexing: "10%" },
  ];

  const productTRarr = productsArr.map((thisProduct) => {
    const itemNum = thisProduct[0];
    const invoProdData = thisProduct[1];
    return (
      <GenericSOSrow
        key={itemNum}
        invoiceProductData={invoProdData}
        itemNum={itemNum}
        productInState={modalState.productsObj[itemNum]}
        changeFunc={inputQtyChange}
      />
    );
  });

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
        <Table
          tableHeadingArray={tableHeadingArr}
          tableBodyArray={productTRarr}
        ></Table>
      </section>
    </BaseModal>
  );
};

export default GenericSOSmodal;
