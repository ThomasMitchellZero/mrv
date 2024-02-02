import classes from "./StartExchange.module.css";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { saleRecordTypes } from "../../../../globalFunctions/globalJS_classes";
import {
  InvoProduct,
  ProdClass,
} from "../../../../globalFunctions/globalJS_classes";

import InvoiceContext from "../../../../store/invoice-context";

import OrdersContext from "../../../../store/orders-context";



import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

import { cloneDeep, isEmpty } from "lodash";

function StartSTRX() {
  const exchCtx = useOutletContext();


  /* ---- SHARED FUNCTIONS ---- */




  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <ExchHeader headerTitle="Start Exchange" hasCluster={false} />
        <div className={``}>
          <button
            type="button"
            onClick={() => {}}
            className={`mrvBtn primary`}
          >
            Add Items From Invoice
          </button>
        </div>
      </section>
    </section>
  );
}

export default StartSTRX ;

/*



*/
