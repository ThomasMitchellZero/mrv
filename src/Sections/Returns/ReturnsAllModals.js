import { useContext } from "react"

import GenericSOSmodal from "./Index/GenericSOS/GenericSOSmodal"

const ReturnsAllModals = ({sessionContext})=>{
    const activeModal = sessionContext.activeModal

    const allModalsObj ={
        genericSOS: <GenericSOSmodal />,
    }
    const displayedModal = allModalsObj[activeModal] ?? null

    return displayedModal;

}

export default ReturnsAllModals