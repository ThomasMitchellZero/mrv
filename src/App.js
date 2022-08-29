import "./App.css";
import GlobalNav from "./components/GlobalNav";
import TitleBar from "./components/UI/TitleBar"
import { MdOutlineClose } from "react-icons/md";



function App() {
  const close = <MdOutlineClose/>
  
  return (

    <div className="App">
      <GlobalNav />
      <p>Hello Returns</p>
      <TitleBar lefticon={close}>The Title</TitleBar>
    </div>
  );
}

export default App;
