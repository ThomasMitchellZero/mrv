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

const itemMoneyObj = ({
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

const useItemTotaler = (itemNum) => {
  return () => {
    console.log("Money bitch!");
  };
};

function useMoneyTotaler() {
  const exchCtx = useOutletContext();

  return () => {};
}

export { useMoneyTotaler, useItemTotaler };
