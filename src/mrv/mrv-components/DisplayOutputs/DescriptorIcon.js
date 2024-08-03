import "./DescriptorIcon.css"
import { FaBoxOpen } from "react-icons/fa6";
import {
  MdReceipt,
  MdReceiptLong,
  MdShoppingCart,
  MdOutlineSick,
} from "react-icons/md";

function DescriptorIcon({
  iconStr = "box",
  ctnrSize = "2.5rem",
  fontSize = "2rem",
  backgroundColor = "color__surface__default",
  color = "color__primary__text",
  radius = "100%",
  REF_box__receipt__receiptLong__cart = "",
}) {
  const styleObj = {
    fontSize: fontSize,
  };

  const iconsObj = {
    box: <FaBoxOpen {...styleObj} />,
    receipt: <MdReceipt {...styleObj} />,
    receiptLong: <MdReceiptLong {...styleObj} />,
    cart: <MdShoppingCart {...styleObj} />,
    sick: <MdOutlineSick {...styleObj} />,
  };

  const outIcon = iconsObj[iconStr] || iconsObj.sick;

  return (
    <div
      style={{ height: ctnrSize, width: ctnrSize, borderRadius: radius }}
      className={`descriptorIcon ${color} ${backgroundColor}`}
    >
      {outIcon}
    </div>
  );
}

export { DescriptorIcon };
