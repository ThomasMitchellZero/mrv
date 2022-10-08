import "./App.css";
import GlobalNav from "./components/GlobalNav";

import ProductContext from "./product-context";
import { useContext } from "react";
import ThirtyPanel from "./components/UI/ThirtyPanel";

function App() {
  const ctx = useContext(ProductContext);
  return (
    <div className="App">
      <GlobalNav />
      <ThirtyPanel></ThirtyPanel>
    </div>
  );
}

export default App;