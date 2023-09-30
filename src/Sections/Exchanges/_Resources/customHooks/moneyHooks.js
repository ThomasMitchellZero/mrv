import { useOutletContext } from "react-router";

const itemsInExchSmpl = {
  9100: {
    qtySold: 2,
    qtyExchanging: 1,
    returningItem: {
      pickupQty: 1,
      productDetails: {
        img: "/mrv/static/media/samsung-front-load.64f2af0123eb84f0415e.png",
        price: 99877,
        itemNum: "9910",
        modelNum: "SFL456",
        description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
        categories: {},
        specialCategories: {
          SOS: true,
        },
        restockFee: 0.2,
        inStock: 99,
        dcLocations: ["BBB"],
        tax: 9776,
        childItemsObj: {
          3333: {
            img: "",
            price: 4500,
            itemNum: "333",
            modelNum: "3YY",
            description: "3 Year LPP",
            categories: {},
            specialCategories: {},
            restockFee: null,
            inStock: 99,
            dcLocations: {},
            tax: 500,
            childItemsObj: {},
          },
        },
      },
      itemDispo: null,
    },
    replacementItem: {
      deliveryQty: 1,
      productDetails: {
        img: "/mrv/static/media/samsung-front-load.64f2af0123eb84f0415e.png",
        price: 99877,
        itemNum: "9910",
        modelNum: "SFL456",
        description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
        categories: {},
        specialCategories: {
          SOS: true,
        },
        restockFee: 0.2,
        inStock: 99,
        dcLocations: ["BBB"],
        tax: 9776,
        childItemsObj: {
          3333: {
            img: "",
            price: 4500,
            itemNum: "333",
            modelNum: "3YY",
            description: "3 Year LPP",
            categories: {},
            specialCategories: {},
            restockFee: null,
            inStock: 99,
            dcLocations: {},
            tax: 500,
            childItemsObj: {},
          },
        },
      },
    },
  },
};

const newMoneyObj = ({
  costDif = 0,
  charge = 0,
  refund = 0,
  tax = 0,
  costAdj = 0,
  fullItemBalance = 0,
}) => {
  return {
    costDif,
    charge,
    refund,
    tax,
    costAdj,
    fullItemBalance,
  };
};

const pullItemMoneyVals = (itemNum) => {
  const itemDetails = itemNum.productDetails;
  // Fn to pull the vals we need out of any object.
  newMoneyObj({
    charge: itemDetails.price,
    tax: itemNum.tax,
  });
};

const useExchItemTotaler = (exchItemEntry) => {
  const [thisExchItemKey, thisExchItemObj] = exchItemEntry;

  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchItems = exchCtx.exchSession.itemsInExchange;

  return () => {
    // money comparison Obj, all values 0
    let outItemMoneyDifObj = newMoneyObj();

    let returnItemRt = [thisExchItemObj].returningItem;
    let replaceItemRt = [thisExchItemObj].replacementItem;

    /*

  Commented out because right now the items are always the same.

      if (
    // If the same items are being exchanged...
    // Net $ is always zero, so return the output with values = 0 and stop.
    returnItemRt.productDetails.itemNum === replaceItemRt.productDetails.itemNum
  ) {
    return outItemMoneyDifObj;
  }
  */

    outItemMoneyDifObj.RetItem = 1;
    outItemMoneyDifObj.ReplItem = 2;

    setExchState((draft) => {
      draft[thisExchItemKey].moneyDifObj = outItemMoneyDifObj;
    });
  };
  // this object represents the price DIFFERENCES, not the price totals.
};

function useMoneyTotaler() {
  return () => {};
}

export { useMoneyTotaler, useExchItemTotaler };
