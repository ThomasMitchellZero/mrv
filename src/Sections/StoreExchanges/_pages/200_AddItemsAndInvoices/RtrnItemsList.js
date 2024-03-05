import { useOutletContext } from "react-router";
import { MRVitemDetails } from "../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";

const RtrnItemsList = () => {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const aReturnItems = sessionState.returnItems;

  const uiItemCard = (returnItem) => {
    return (
      <div key={returnItem.atomItemNum} className={`cardStyle`}>
        <MRVitemDetails showPrice={true} thisItemAtom={returnItem} />
      </div>
    );
  };

  const uiCardArr = aReturnItems.map((returnItem) => {
    return uiItemCard(returnItem);
  });

  return <section className={`cardContainer`}>{uiCardArr}</section>;
};

export { RtrnItemsList };
