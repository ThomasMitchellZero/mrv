import classes from "./SessionItems70.module.css";

import StartScanning from "../Index/StartScanning70";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const SessionItems70 = (props) => {
  const returnsContext = props.returnsContext;

  const ctxItems = returnsContext.session.items;

  const ctxTestData = returnsContext.session.testData;

  const tableData = ctxTestData.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.content}</td>
        <td>{item.date}</td>
      </tr>
    );
  });

  return ctxItems.length <= 0 ? (
    <StartScanning />
  ) : (
    <section className={classes.container}>
      <TitleBar>Scanned Items</TitleBar>
      <section className={classes.mainContent}>
        <div className={classes.tableWindow}>
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
        </div>
      </section>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default SessionItems70;

/*



*/
