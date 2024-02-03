import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import {
  ProdClass,
  InvoProduct,
} from "../../../../globalFunctions/globalJS_classes";

import { cloneDeep, isEmpty } from "lodash";

//// Money Handlers ////

const useCentsToDollars = () => {
  return (priceInCents = 4200) => {
    return Number.parseFloat(priceInCents / 100).toFixed(2);
  };
};

const useDollarsToCents = () => {
  return (priceInDollars) => {
    return Number.parseFloat(priceInDollars.toFixed(2)) * 100;
  };
};

const makeTax = (itemPrice) => {
  return Math.round(itemPrice * 0.09);
};

const newMoneyObj = ({
  costDif = 0,
  taxDif = 0,
  charge = 0,
  refund = 0,
  costAdj = 0,
  fullItemBalance = 0,
}) => {
  return {
    costDif,
    taxDif,
    charge,
    refund,
    costAdj,
    fullItemBalance,
  };
};


export {
  //Money
  useCentsToDollars,

};
