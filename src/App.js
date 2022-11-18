import "./App.css";
import "./app-styles/table.css"
import "./app-styles/buttons.css"
import "./app-styles/specialtext.css"
import "./app-styles/inputs.css"

import { Route, Routes } from "react-router-dom";

import Main from "./components/UI/Main";
import Placeholder from "./Sections/Placeholder/Placeholder";

// Returns
import Returns from "./Sections/Returns/Returns";
import ReturnsIndex from "./Sections/Returns/Index/ReturnsIndex";

function App() {
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
            <Route index element={<ReturnsIndex></ReturnsIndex>}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
