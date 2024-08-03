import "./ScanScreenMRV.css";
import Universal from "../../../assets/lowes-icons/Picture-Icons/universal-scan.svg";
import Cart from "../../../assets/lowes-icons/Picture-Icons/Cart.svg";
import Receipt from "../../../assets/lowes-icons/Picture-Icons/Receipt.svg";
import { DescriptorIcon } from "./DescriptorIcon";

const ScanScreenMRV = ({
  mainTitle = "Main Title",
  subtitle = "Subtitle",
  subtitleJSX = null,
  imgStr = "",
  iconStr = "box",
}) => {
  const imgSrc = {
    Universal,
    Cart,
    Receipt,
  };

  const iconConfig = (
    <DescriptorIcon
      ctnrSize="8rem"
      fontSize="6rem"
      color="color__primary__text"
      iconStr={iconStr}
    />
  );

  return (
    <div className={`scanScreen`}>
      {iconConfig}

      <h4 className={`heading__medium color__primary__text`}>{mainTitle}</h4>
      <p className={`color__tertiary__text body__large`}>{subtitle}</p>
      {subtitleJSX}
    </div>
  );
};

export { ScanScreenMRV };

/*



*/
