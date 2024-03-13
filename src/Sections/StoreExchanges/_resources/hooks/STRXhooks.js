import InvoiceContext from "../../../../store/invoice-context";
import ProductContext from "../../../../store/product-context";

import { useOutletContext } from "react-router";
import { useContext } from "react";

import {
  ProdClass,
  InvoProduct,
} from "../../../../globalFunctions/globalJS_classes";

import {
  useReturnAutoDeriver,
  useDeleteItemAtom,
  useAddItemAtom,
  useEditItemQty,
  useSetSessionItems,
  useSetSessionInvos,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { cloneDeep, isEmpty } from "lodash";

//// Money Handlers ////

// This is currently ALLL junk.  Just to refer to later

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

//// Item Handlers ////

const useSetSessionItemsSTRX = () => {
  // mrv qty changer, but configured for STRX.
  const strxCtx = useOutletContext();
  return useSetSessionItems({
    sessionState: strxCtx.sessionSTRX,
    setSessionState: strxCtx.setSessionStrx,
  });
};

const useSetSessionInvosSTRX = () => {
  const strxCtx = useOutletContext();
  return useSetSessionInvos({
    sessionState: strxCtx.sessionSTRX,
    setSessionState: strxCtx.setSessionStrx,
  });
};

export { useSetSessionItemsSTRX, useSetSessionInvosSTRX };

const useAutoDeriverSTRX = () => {
  const returnAutoDeriver = useReturnAutoDeriver();

  const autoDeriverSTRX = (draftState) => {
    let outStrxState = cloneDeep(draftState);

    outStrxState = returnAutoDeriver(outStrxState);

    return outStrxState;
  };
  return autoDeriverSTRX;
};

export { useAutoDeriverSTRX };
