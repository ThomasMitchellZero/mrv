import "./App.css";

import ProductContext from "./product-context";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./components/UI/Main";
import ScanReceipts from "./Sections/Scan_Receipts/ScanReceipts";
import Placeholder from "./Sections/Placeholder/Placeholder";

import Returns from "./Sections/Returns/Returns";

function App() {
  const ctx = useContext(ProductContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Placeholder>Home</Placeholder>} />
          <Route path="home" element={<Placeholder>Home</Placeholder>} />
          <Route path="orders" element={<Placeholder>Orders</Placeholder>} />
          <Route
            path="showroom"
            element={<Placeholder>Showroom</Placeholder>}
          />

          <Route path="returns" element={<Returns />}>
            <Route index element={<ScanReceipts></ScanReceipts>}></Route>
            <Route path="scan_receipts" element={<ScanReceipts></ScanReceipts>}>
              <Route index></Route>
            </Route>
          </Route>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;