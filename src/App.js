import "./App.css";
import GlobalNav from "./components/GlobalNav";

import ProductContext from "./product-context";
import { useContext } from "react";
import BasePanel from "./components/UI/BasePanel";

function App() {
  const ctx = useContext(ProductContext);
  return (
    <div className="App">
      <GlobalNav />
      <BasePanel></BasePanel>
    </div>
  );
}

export default App;