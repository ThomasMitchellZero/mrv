import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useExchNav } from "../../_Resources/customHooks/useExchNav";

import { useOutletContext, useNavigate } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

function ExchReason() {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProducts = exchCtx.exchSession.exchProducts;
  const exchNav = useExchNav();


  const defaultState = { activeIndex: nextActive() };
    //local state
    const [locSt_ExchReason, setLocSt_ExchReason] = useImmer(defaultState);

  // Shared Functions //////////////////

  function nextActive(){
    let activeIndex = null;

    for (const key of exchProducts.keys()) {
      console.log(key);
      if (!exchProducts.get(key).exchReason) {
        activeIndex = key;
        break;
      }
    }
    return activeIndex;
  };

  const handleTRclick=(key)=>{
    setLocSt_ExchReason((draft)=>{
      draft.activeIndex = key
    })
  }



  /* ---- Shared Functions ---- */

  // make headers with titles
  const thFactory = (title = "") => {
    return { title };
  };
  const thInputs = [
    thFactory("Product Details"),
    thFactory("Quantity"),
    thFactory("Return Reason"),
    thFactory("Remove"),
  ];

  const thArray = thInputs.map((th) => {
    return <th key={th.title}>{th.title}</th>;
  });

  // Generate the TRs

  const trArray = [];

  exchProducts.forEach((value, key) => {
    trArray.push(
      <tr
        key={key}
        className={`${locSt_ExchReason.activeIndex === key ? "active" : ""}`}
        onClick={()=> handleTRclick(key)}
      >
        <td>
          <ProductInfo hasPrice={true} itemObj={value} />
        </td>
        <td>{value.qtyExchanging}</td>
        <td>{value.exchReason}</td>
        <td>
          <button className={`mrvBtn ghost`}>X</button>
        </td>
      </tr>
    );
  });

  /*







*/

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main exch-rows`}>
        <ExchHeader
          headerTitle="Reason For Exchange"
          hasCluster={true}
          hasIcon={"back"}
          navBtnClick={() => exchNav({ routeStr: "chooseitems" })}
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
      {locSt_ExchReason.activeIndex ? <section className="mrvPanel__side"></section> : null}
    </section>
  );
}

export { ExchReason };

/*
  
  200: { 
    quantity: 1, 
    price: 463, 
    tax: 41, 
    productDetails: {img: frontload_washer_img,
        price: 76600,
        itemNum: "910",
        modelNum: "SFL456",
        description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
        categories: ["Stock","Delivery"],
        specialCategories: {SOS:true},
        restockFee: 0.2,
        inStock: 2,
    },
 }
  
  */
