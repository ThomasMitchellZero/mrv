import classes from "./GenericSOSmodal.module.css";

import { BaseModal } from "../../../../components/UI/PageLayout/Modal";
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

  //TODO: I think I can just get the OutletContext rather than taking this as a prop.  
  // cloned Session context
  const sessionCtx = cloneDeep(returnsContext.session);
  const activeModalRefObj = sessionCtx.activeModal.refObj;
  const productsObj = activeModalRefObj.products;
  const productsArr = Object.entries(productsObj);
  const setPanels = activeModalRefObj.setPanels;

  // ---- LOCAL STATE ----

  // calculates default value for initial state.
  const makeInitialProductsObj = () => {
    const initialOutput = {};
    for (const thisProduct of productsArr) {
      const key = thisProduct[0];
      initialOutput[key] = { quantity: "" };
    }
    return initialOutput;
  };

  

  const [modalState, setModalState] = useState({
    isValid: false,
    productsObj: makeInitialProductsObj(),
  });

  // ---- SHARED FUNCTIONS ----



  const closeModal = () => {

    dispatchReturns({
      type: "SET_MODAL",
      payload: null,
    });
  };

  const inputQtyChange = (event, itemNum, max) => {
    // process user input
    const rawIn = event.target.value;
    const input = parseInt(rawIn);
    let outQty =
      input > max // if Input is too big?
        ? max
        : !input // if Input is falsy?
        ? ""
        : input;

    const outProductsObj = {
      ...modalState.productsObj,
      [itemNum]: { quantity: outQty },
    };

    // evaluate form validity
    let outIsValid = false;
    // loop through all quantities.  If any are truthy, form is valid.
    for (const thisStateProduct of Object.values(outProductsObj)) {
      if (thisStateProduct.quantity) {
        outIsValid = true;
        continue;
      }
    }

    setModalState({
      ...modalState,
      isValid: outIsValid,
      productsObj: outProductsObj,
    });
  };

  // handle Form Submit

  const submitGSOSform = (event) => {
    event.preventDefault();
    const outSessionItemsObj = addItem({
      itemsToAddObj: modalState.productsObj,
      returnsItems: sessionCtx.items,
      productContext: productsCatalogCtx,
    });

    dispatchReturns({ type: "ADD_ITEM", payload: outSessionItemsObj });

    setPanels({
      type: "SET_PANELS",
      payload: { set30: "actions", set70: "session_items" },
    });

    closeModal();
  };

  // ---- ITEMS TABLE ----


  const tableHeadingArr = [
    { id: "Description", active: false, width: "auto" },
    { id: "Status", active: false, width: "15%" },
    { id: "Unit $", active: false, width: "15%" },
    { id: "Quantity", active: false, width: "10%" },
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

  // ---- SUBMIT BUTTON ----
  const submitBtn = modalState.isValid ? (
    <button
      form="GSOSmodalForm"
      type="submit"
      disabled={!modalState.isValid}
      className={`baseButton primary large contained70`}
    >
      Apply
    </button>
  ) : null;

  return (
    <BaseModal>
      <form
        className={classes.container}
        id={"GSOSmodalForm"}
        onSubmit={submitGSOSform}
      >
        <section className={`${classes.title}`}>
          <button
            type="button"
            className={`baseIconButton medium`}
            onClick={closeModal}
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
        <section className={`base-footer`}>{submitBtn}</section>
      </form>
    </BaseModal>
  );
};

export default GenericSOSmodal;
