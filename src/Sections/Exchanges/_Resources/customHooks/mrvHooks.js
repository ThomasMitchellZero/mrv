import { useOutletContext } from "react-router";

const useDeCentsitize = () => {
  return (priceInCents = 4200) => {
    return `${(priceInCents / 100).toFixed(2)}`;
  };
};

export { useDeCentsitize };
