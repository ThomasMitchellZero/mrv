import classes from "./StartExchange.module.css";
import { MRVheader } from "../../../../mrv/mrv-components/MRVheader";
import { ExchHeader } from "../../_Resources/components/ExchHeader";

import { Link } from "react-router-dom";

import produce from "immer";
import { useOutletContext } from "react-router-dom";

function StartExchange() {
  const exchangesCtx = useOutletContext();
  const todosCtx = exchangesCtx.sessionToDo;

  return (
    <section
      className={`mrv-primary-columns ${classes.container}`}
    >
      <section className={`mrv-panel__main exch-rows`}>
        <ExchHeader hasIcon={"back"} hasCluster={true} navBtnClick={() => console.log("TAST")} />
        <div className={`main_content main_col`}>
          <Link to={"chooseitems"}>Continue</Link>
        </div>
      </section>
    </section>
  );
}

export default StartExchange;

/*

  XAAA:{

      invoiceDetails: {
        store: 1234,
        date: new Date(2022, 3, 8),
        payment: {
          44443333: {
            tenderType: tType.check,
            tenderLabel: "Check ****3333",
            paid: 0,
            routingNum: "44443333",
            accountNum: "33334444",
          },
        },
        orderNum: "X11111111",
      },

      products: {
        900: { quantity: 2, price: 103115, tax: 11030 },
        910: { quantity: 1, price: 91234, tax: 9120 },
        400: { quantity: 1, price: 38723, tax: 3810 },
    },
  },

*/
