import { useOutletContext, useNavigate } from "react-router";

function useGroupAppointments() {
  const exchCtx = useOutletContext();
  const setSessionSt = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchProducts;

  return () => {
    const outShipmentsObj = {};

    for (const key of exchProdsMap.keys()) {
    }
  };
}

export { useGroupAppointments };
