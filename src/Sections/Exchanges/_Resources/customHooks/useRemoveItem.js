
import { useOutletContext, useNavigate } from "react-router";

function useRemoveItem(){
    const navigate = useNavigate();

    const exchCtx = useOutletContext();
    const setSessionSt = exchCtx.setExchSession;

    return ({targetMap = null, itemKey})=>{
        
        targetMap ??= exchCtx.exchSession.exchProducts;
        const cartSize = targetMap.size;
    }

}

export {useRemoveItem}