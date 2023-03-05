import { useContext } from "react";

import GenericSOSmodal from "./Index/GenericSOS/GenericSOSmodal";

const ReturnsAllModals = ({ returnsCtx }) => {

  const activeModal = returnsCtx.session?.activeModal?.type;

  const allModalsObj = {
    genericSOS: (
      <GenericSOSmodal
        returnsContext={returnsCtx}
      />
    ),
  };
  const displayedModal = allModalsObj[activeModal] ?? null;

  return displayedModal;
};

export default ReturnsAllModals;
