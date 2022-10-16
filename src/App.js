import "./App.css";

import ProductContext from "./product-context";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import GlobalNav from "./components/UI/GlobalNav";
import ScanReceipts from "./Sections/Scan_Receipts/ScanReceipts";
import Placeholder from "./Sections/Placeholder/Placeholder";

function App() {
  const ctx = useContext(ProductContext);

  return (
    <div className="App">
      <GlobalNav />
      <Routes>

        <Route path="home" element={<Placeholder>Home</Placeholder>}/>
        <Route path="orders" element={<Placeholder>Orders</Placeholder>}/>
        <Route path="showroom" element={<Placeholder>Showroom</Placeholder>}/>
        <Route path="returns" element={<ScanReceipts/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
