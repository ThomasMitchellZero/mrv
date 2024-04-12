import "./DeleteCardColMRV.css";

import { DeleteCardBtnMRV } from "./DeleteCardBtnMRV";
import { greenify } from "../../MRVhooks/MRVhooks";

const DeleteCardColMRV = ({
  onClick = () => {
    console.log("No function");
  },
  bigValue,
  description = "",
}) => {
  return (
    <div className={`deleteCardCol`}>
      <DeleteCardBtnMRV onClick={onClick}></DeleteCardBtnMRV>
      <div className={`spacer`} />
      <div className={`heading__small color__tertiary__text `}>{description}</div>
      <div className={`tinyText color__primary__text ${greenify(bigValue)}`}>{bigValue}</div>
    </div>
  );
};

export { DeleteCardColMRV };
