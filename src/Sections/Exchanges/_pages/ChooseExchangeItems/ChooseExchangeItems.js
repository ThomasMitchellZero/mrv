import classes from "./ChooseExchangeItems.module.css";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";

function ChooseExchangeItems() {
  const navigate = useNavigate();
  const exchCtx = useOutletContext();
  const orderProducts = exchCtx.exchSession.invoiceProducts;

  // make headers with titles
  const thFactory = (title = "") => {
    return { title };
  };
  const thInputs = [thFactory("Product Details"), { title: "Sold" }];
  const thArray = thInputs.map((th) => {
    return <th key={th.title}>{th.title}</th>;
  });

  // Generate the TRs
  
  const trArray = Object.keys(orderProducts).map((product) => {
    return (
      <tr key={product}>
        <td>
          <ProductInfo itemObj={orderProducts[product]} />
        </td>
        <td>a</td>
      </tr>
    );
  });

  return (
    <section className={`mrvPage ${classes.container}`}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Select items to exchange"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => navigate(-1)}
        />
        <section className={`main_content main_col`}>
          <table>
            <thead>
              <tr>{thArray}</tr>
            </thead>
            <tbody>{trArray}</tbody>
          </table>
        </section>
        <ExchPizzaTracker />
      </section>
    </section>
  );
}

export default ChooseExchangeItems;
