import { current } from "immer";
import { useOutletContext, useNavigate } from "react-router";

function useRemoveItem() {
  const navigate = useNavigate();

  const exchCtx = useOutletContext();
  const setSessionSt = exchCtx.setExchSession;

  return ({ targetMap = null, itemKey }) => {
    targetMap ??= exchCtx.exchSession.exchProducts;

    const cartSize = targetMap.size;

    let arrnt = undefined;

    if (cartSize > 0) {
      setSessionSt((draft) => {
        draft.exchProducts.delete(itemKey);

        const output = current(draft.exchProducts);
        arrnt = output;

      });
    } else {
      console.log("Declined!");
    }
    console.log(arrnt);
  };
}

export { useRemoveItem };
