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

