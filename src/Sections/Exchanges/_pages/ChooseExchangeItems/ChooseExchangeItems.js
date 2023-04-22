import classes from "./ChooseExchangeItems.module.css";

import { ExchPizzaTracker } from "../../_Resources/components/pageLayout/exchPizzaTracker";
import { ProductInfo } from "../../_Resources/components/displayOutputs/ProductInfo";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";

function ChooseExchangeItems() {
  const navigate = useNavigate();
  const exchCtx = useOutletContext();
  const orderProducts = exchCtx.exchSession.invoiceProducts;

// Returns TR ref
// <th onClick={clickHandler} style={{ width: `${props.width}` }}>

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
    const pDetails = thisProd.productDetails

    return (
      <tr key={product} className={``}>
        <td>
          <ProductInfo hasPrice={true} itemObj={thisProd} />
        </td>
        <td>{`${thisProd.quantity}`}</td>
        <td>{`${pDetails.inStock}`}</td>
        <td><MRVinput width={"5rem"} type="number" min={0}></MRVinput></td>
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
