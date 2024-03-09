import "./ScanScreenMRV.css"
import Universal from "../../../../assets/lowes-icons/Picture-Icons/universal-scan.svg"
import Cart from "../../../../assets/lowes-icons/Picture-Icons/cart.svg"
import Receipt from "../../../../assets/lowes-icons/Picture-Icons/receipt.svg"
import blank from "../../../../assets/lowes-icons/Picture-Icons/blank.svg"

const NoneScanned = ({mainTitle = "Main Title", subtitle = "Subtitle", imgStr = ""}) => {
  return (
    <div className={`noneScanned`}>
      <img src={Universal} alt={"Scanning Graphic"} />
      <h4 className={`color__primary__text`}>Start Scanning</h4>
      <p className={`color__tertiary__text body__large`}>
        You may scan or enter multiple receipts or items
      </p>
    </div>
  );
};

export { NoneScanned };

/*



*/
