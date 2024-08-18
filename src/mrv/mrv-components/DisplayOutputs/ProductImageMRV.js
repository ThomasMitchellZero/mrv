import "./ProductImageMRV.css";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useCentsToDollars } from "../../MRVhooks/MRVhooks";
import ProductContext from "../../../store/product-context";
import { useContext } from "react";
import { returnAtom } from "../../../globalFunctions/globalJS_classes";

function ProductImageMRV({
  itemAtom = new returnAtom({ }),
  showChildArrow = true,
  imageOnly = false,
  size = "L",
  REF_size____L_M_S,
}) {
  const productCtx = useContext(ProductContext);
  const ctxItemInfo = productCtx[itemAtom.bifrostKey];
  const prodImg = ctxItemInfo.img;

  // in some cases we want the spacer but not the arrow icon.
  const uiChildArrow = showChildArrow ? (
    <MdSubdirectoryArrowRight size={"2rem"} />
  ) : null;

  // if we specify imageOnly, we don't want any icons to the left of the image.
  const uiLeftIcon = imageOnly ? null : (
    <div className={`childArrowCtnr`}>{uiChildArrow}</div>
  );

  const oConfig = {
    L: { childIcon: null },
    M: { childIcon: uiLeftIcon },
    S: { childIcon: uiLeftIcon },
  };

  return (
    <div className={`productImageMRV ${size}`}>
      {oConfig[size].childIcon}
      <div className={`imageCtnr`}>
        <img className={`image`} src={prodImg} alt="Product" />
      </div>
    </div>
  );
}

export { ProductImageMRV };
