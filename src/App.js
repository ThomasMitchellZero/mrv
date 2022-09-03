import "./App.css";
import GlobalNav from "./components/GlobalNav";
import TitleBar from "./components/UI/TitleBar";
import ReceiptList from "./Sections/ReceiptList";

function App() {

  return (

    <div className="App">
      <GlobalNav />
      <ReceiptList />
    </div>
  );
}

export default App;