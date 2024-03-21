import { TitleBarSTRX } from "./CompConfigsSTRX";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";
import { MRVinput } from "../../../../mrv/mrv-components/inputs/MRVinput";
import { useSetSessionItemsSTRX } from "../hooks/STRXhooks";

const ItemDetails30STRX = ({
  typeConfig = "return",
  activeItemNum,
  handleQtyChange = () => {},
  itemStateQty,
  setItemState,
  handleClose,
}) => {
  const configObj = { stateItemArr: "Return" };

  const setSTRXItem = useSetSessionItemsSTRX({
    itemArrRouteStr: configObj.stateItemArr,
    actionType: "edit",
  });

  <main className={`mrvPanel__side color__surface__default`}>
    <TitleBarSTRX
      hasCluster={false}
      showProductName={false}
      hasIcon={"close"}
      headerTitle={"Item Details"}
    />
    <section className={`main_content`}>
      <div className={``}>
        <div className={``}>
          <MRVitemDetails
            showPrice={false}
            showQty={false}
            thisItemAtom={activeItemNum}
          />
        </div>
        <div className={``}>
          <MRVinput width={"8rem"}>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="Qty"
              value={2}
              onChange={handleQtyChange}
            />
          </MRVinput>
        </div>
      </div>
    </section>
  </main>;
};

export { ItemDetails30STRX };
