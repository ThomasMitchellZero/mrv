import "./DeleteCardBtnMRV.css";
import { MdDeleteOutline, MdClose } from "react-icons/md";


const DeleteCardBtnMRV = ({
  onClick = () => {
    console.log("No function");
  },
  btnText = <MdClose fontSize="1.5rem" />,
}) => {
  const handleClick = () => {
    // just in case I ever want to add in the text confirmation behavior.
    onClick();
  };

  return (
    <button className={`secondary deleteCardBtn`} onClick={handleClick}>
      {btnText}
    </button>
  );
};

export { DeleteCardBtnMRV };
