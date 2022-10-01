import "./App.css";
import GlobalNav from "./components/GlobalNav";
import ReceiptList from "./Sections/ReceiptList";
import ScannedItemList from "./Sections/ScannedItemList";
import ProductContext from "./product-context";
import { useContext } from "react";
import ScannedItemDetailCard from "./Sections/ScannedItemDetailCard";

function App() {
  const ctx = useContext(ProductContext)
  return (

      <div className="App">
        <GlobalNav />
        <ReceiptList />
        <ScannedItemList />
        <img src={ctx.faucet.img}></img>
        <ScannedItemDetailCard product={ctx.toilet}/>
      </div>

  );
}

export default App;

// http://localhost:3000/assets/Product-Images/faucet.png

// {`${ctx.faucet.imgPath}`}