

import { useOutletContext } from "react-router-dom";

const ScanItems = () => {
  const returnsContext = useOutletContext();


  const ctxItems = returnsContext.session.items;


  return (<div></div>)

};

export default ScanItems;

/*



*/
