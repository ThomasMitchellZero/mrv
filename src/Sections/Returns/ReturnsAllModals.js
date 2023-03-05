import { useContext } from "react";

import GenericSOSmodal from "./Index/GenericSOS/GenericSOSmodal";

const ReturnsAllModals = ({ sessionContext }) => {
  const activeModal = sessionContext.activeModal?.type;
  const modalRefObj = sessionContext.activeModal?.refObj;

  const allModalsObj = {
    genericSOS: (
      <GenericSOSmodal
        returnsContext={sessionContext}
        referenceObj={modalRefObj}
      />
    ),
  };
  const displayedModal = allModalsObj[activeModal] ?? null;

  return displayedModal;
};

export default ReturnsAllModals;
