import "./App.css";
import GlobalNav from "./components/GlobalNav";
import ReceiptList from "./Sections/ReceiptList";
import ScannedItemList from "./Sections/ScannedItemList";

function App() {

  return (

    <div className="App">
      <GlobalNav />
      <ReceiptList />
      <ScannedItemList />
    </div>
  );
}

export default App;