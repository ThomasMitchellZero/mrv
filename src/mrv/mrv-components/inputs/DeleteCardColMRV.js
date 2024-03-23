import "./DeleteCardColMRV.css";

import { DeleteCardBtnMRV } from "./DeleteCardBtnMRV";

const DeleteCardColMRV = ({
  onClick = () => {
    console.log("No function");
  },
}) => {
  return (
    <div className={`deleteCardCol`}>
      <DeleteCardBtnMRV onClick={onClick}></DeleteCardBtnMRV>
      <div className={`spacer`} />
    </div>
  );
};

export { DeleteCardColMRV };
