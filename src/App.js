import "./App.css";
import GlobalNav from "./components/UI/GlobalNav";

import ProductContext from "./product-context";
import { useContext } from "react";
import ScanReceipts from "./Sections/Scan_Receipts/ScanReceipts";

function App() {
  const ctx = useContext(ProductContext);
  return (
    <div className="App">
      <GlobalNav />
      <ScanReceipts />
    </div>
  );
}

export default App;