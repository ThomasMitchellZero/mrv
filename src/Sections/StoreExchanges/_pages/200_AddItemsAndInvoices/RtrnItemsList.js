import { useOutletContext } from "react-router";


const RtrnItemsList = () => {
  const strxCtx = useOutletContext();
  const sessionState = strxCtx.sessionSTRX;
  const setSession = strxCtx.setSessionStrx;
  const aReturnItems = sessionState.returnItems;

  const uiItemCard = (returnItem) => {
    
    return (
      <div key={returnItem.atomItemNum} className={`cardStyle`}>
        <p>{returnItem.atomItemNum}</p>
        <p>fart</p>
      </div>
    );
  };

  const uiCardArr = aReturnItems.map((returnItem) => {
    return uiItemCard(returnItem);
  });

  return <section className={`cardContainer`}>{uiCardArr}</section>;
};

export { RtrnItemsList };
