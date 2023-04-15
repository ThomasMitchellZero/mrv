import classes from "./ChooseExchangeItems.module.css";

import { ExchPizzaTracker } from "../../_Resources/components/exchPizzaTracker";

import ProductContext from "../../../../store/product-context";

import { ExchHeader } from "../../_Resources/components/ExchHeader";
import { useNavigate } from "react-router";

function ChooseExchangeItems() {
  const navigate = useNavigate();

  return (
    <section className={`mrv-primary-columns ${classes.container}`}>
      <section className={`mrv-panel__main exch-rows`}>
        <ExchHeader
          headerTitle="Select items to exchange"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => navigate(-1)}
        />
        <div className={`main_content main_col`}></div>
        <ExchPizzaTracker />
      </section>
    </section>
  );
}

export default ChooseExchangeItems;
