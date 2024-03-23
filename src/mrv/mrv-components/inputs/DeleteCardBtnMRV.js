import "./DeleteCardBtnMRV.css";
import { MdDeleteOutline } from "react-icons/md";

const DeleteCardBtnMRV = ({
  onClick = () => {
    console.log("No function");
  },
  btnText = <MdDeleteOutline fontSize="2.5rem" />,
}) => {
  const handleClick = () => {
    // just in case I ever want to add in the text confirmation behavior.
    onClick();
  };

  return (
    <button className={`deleteCardBtn`} onClick={handleClick}>
      {btnText}
    </button>
  );
};

export { DeleteCardBtnMRV };
