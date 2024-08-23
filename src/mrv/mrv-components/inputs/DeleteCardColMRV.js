import "./DeleteCardColMRV.css";

import { DeleteCardBtnMRV } from "./DeleteCardBtnMRV";
import { greenify } from "../../MRVhooks/MRVhooks";

const DeleteCardColMRV = ({
  greenifyVal = false,
  onClick = () => {
    console.log("No function");
  },
  bigValue,
  description = "",
}) => {
  const greenClass = greenify(greenifyVal);

  return (
    <div className={`deleteCardCol`}>
      <DeleteCardBtnMRV onClick={onClick}></DeleteCardBtnMRV>
      <div className={`spacer`} />
      <div className={`tinyText color__tertiary__text `}>{description}</div>
      <div className={`heading__small color__primary__text ${greenClass}`}>
        {bigValue}
      </div>
    </div>
  );
};

export { DeleteCardColMRV };
