import classes from "./ChooseExchangeItems.module.css";

import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useOutletContext, useNavigate } from "react-router";
import { useImmer } from "use-immer";
import cloneDeep from "lodash.clonedeep";

const defaultState = {
  formValid: false,
  formWarning: false,
  needsMO: false,
};

function ChooseExchangeItems() {
  const navigate = useNavigate();
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const orderProducts = exchCtx.exchSession.invoiceProducts;

  // LocalState
  const [locSt_PickItems, setLocSt_PickItems] = useImmer(defaultState);

  /* ---- Shared Functions ---- */

  // Will we ever need this outside
  const validateInputs = (target) => {
    let isValid = false;
    for (const prodNum of Object.keys(target)) {
      if (parseInt(target[prodNum].qtyExchanging)) {
        isValid = true;

        // for Manager Override, add check here.
      }
    }

    setLocSt_PickItems((draft) => {
      draft.formValid = isValid;
    });
  };

  const handleFieldInput = (event, itemNum) => {
    let input = parseInt(event.target.value)
    input = input ? input : 0;
    
    let outProducts = cloneDeep(orderProducts);
    outProducts[itemNum].qtyExchanging = input;

    setExchState((draft) => {
      draft.invoiceProducts = outProducts;
    });
  };

  const handleContinue = () => {
    const outProdMap = new Map();
    for (const itemNum of Object.keys(orderProducts)){
      if (orderProducts[itemNum].qtyExchanging) {
        outProdMap.set(itemNum, cloneDeep(orderProducts[itemNum]))
      }
    }

    if(outProdMap.size){ // if there are any non-zero quantities..
      
      setLocSt_PickItems((draft)=>{
        draft.formWarning = false
      })

      setExchState((draft) => {
        draft.exchProducts = outProdMap
      });
    } else {
      setLocSt_PickItems((draft)=>{
        draft.formWarning = true
      })
    }







    //navigate("../exch-reason")
  };

  // make headers with titles
  const thFactory = (title = "") => {
    return { title };
  };
  const thInputs = [
    thFactory("Product Details"),
    thFactory("Sold"),
    thFactory("In Stock"),
    thFactory("Exchange Qty"),
    thFactory("Status"),
    thFactory("Manager Approval Needed"),
  ];

  const thArray = thInputs.map((th) => {
    return <th key={th.title}>{th.title}</th>;
  });

  // Generate the TRs

  const trArray = Object.keys(orderProducts).map((product) => {
    const thisProd = orderProducts[product];
    const pDetails = thisProd.productDetails;

    return (
      <tr key={product} className={``}>
        <td>
          <ProductInfo hasPrice={true} itemObj={thisProd} />
        </td>
        <td>{`${thisProd.quantity}`}</td>
        <td>{`${pDetails.inStock}`}</td>
        <td>
          <MRVinput width={"5rem"}>
            <input
              type="number"
              min={0}
              step={1}
              value={thisProd.qtyExchanging}
              onChange={(event) => {
                handleFieldInput(event, product);
              }}
            />
          </MRVinput>
        </td>
        <td>Picked Up</td>
        <td></td>
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
        <ExchPizzaTracker />
        <section className={`main_content main_col`}>
          <table>
            <thead>
              <tr>{thArray}</tr>
            </thead>
            <tbody>{trArray}</tbody>
          </table>
        </section>
        <section className={`footer_content right_col`}>
          <button
            className={`mrvBtn primary fullWidth jumbo`}
            onClick={handleContinue}
          >
            Continue
          </button>
        </section>
      </section>
    </section>
  );
}

export default ChooseExchangeItems;

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
