import "./App.css";
import GlobalNav from "./components/GlobalNav";

import ProductContext from "./product-context";
import { useContext } from "react";
import ScannedItemDetailCard from "./Sections/ScannedItemDetailCard";

function App() {
  const ctx = useContext(ProductContext);
  return (
    <div className="App">
      <GlobalNav />
      <ScannedItemDetailCard product={ctx.topload_washer}></ScannedItemDetailCard>
    </div>
  );
}

export default App;