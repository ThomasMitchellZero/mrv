import "./ScanScreenMRV.css";
import Universal from "../../../assets/lowes-icons/Picture-Icons/universal-scan.svg";
import Cart from "../../../assets/lowes-icons/Picture-Icons/Cart.svg";
import Receipt from "../../../assets/lowes-icons/Picture-Icons/Receipt.svg";

const ScanScreenMRV = ({
  mainTitle = "Main Title",
  subtitle = "Subtitle",
  subtitleJSX = null,
  imgStr = "",
}) => {
  const imgSrc = {
    Universal,
    Cart,
    Receipt,
  };

  const activeImg = imgSrc[imgStr] || imgSrc.Universal;

  return (
    <div className={`scanScreen`}>
      <img src={activeImg} alt={"Scanning Graphic"} />
      <h4 className={`color__primary__text`}>{mainTitle}</h4>
      <p className={`color__tertiary__text body__large`}>{subtitle}</p>
      {subtitleJSX}
    </div>
  );
};

export { ScanScreenMRV };

/*



*/
