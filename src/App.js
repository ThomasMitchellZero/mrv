import "./App.css";
import classes from "./Sections/Returns/Add_Items/SessionItems70.module.css";
import appClasses from "./AppTest.module.css";

import TitleBar from "./components/UI/TitleBar";
import FooterContainer from "./components/UI/FooterContainer";
import Actions30 from "./Sections/Returns/Actions30";
import Main from "./components/UI/Main"

function App() {
  const testDataMaker = (length) => {
    let output = [];
    for (let i = 0; i < length; i++) {
      output = [
        ...output,
        {
          id: i,
          content: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          date: "5 August 1983",
        },
      ];
    }
    return output;
  };

  const testData = testDataMaker(55);

  const tableData = testData.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.content}</td>
        <td>{item.date}</td>
      </tr>
    );
  });

  return (
    <Main>
    <div className={appClasses.horizontalContainer}>
      <section className={`seventy_panel ${classes.container}`}>
        <TitleBar>Scanned Items</TitleBar>
        <section className={classes.mainContent}>
          <table>
            <thead>
              <tr>
                <th>Column 1</th>
                <th>Second Column</th>
                <th>Le Troisieme</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </section>
        <FooterContainer></FooterContainer>
      </section>
      <section className="thirty_panel">
        <Actions30 />
      </section>
    </div>
    </Main>
  );
}

export default App;

/* 

import "./App.css";



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





*/
