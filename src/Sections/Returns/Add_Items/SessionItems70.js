import classes from "./SessionItems70.module.css";

import StartScanning from "../Index/StartScanning70";
import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

import Table from "../../../components/UI/Table";

const SessionItems70 = (props) => {
  const returnsContext = props.returnsContext;

  const ctxItems = returnsContext.session.items;

  const handleHeadingClick = (event) => {
    const origin = event.target;
    console.log(origin);
  };

  
  /*
        <TableHeading
        key={item.id}
        id={item.id}
        active={item.active}
        descending={item.descending}
        flexing={item.flexing}
        onClick={item.handleHeadingClick}
      >
        {item.id}
      </TableHeading>
    );
  });

    */

  const headingList = [
    { id: "Sale Date", active: false, descending: true, flexing: "auto" },
    { id: "Invoice #", active: false, descending: true, flexing: "auto" },
    { id: "Store #", active: false, descending: true, flexing: "auto" },
    { id: "Line Items", active: false, descending: true, flexing: "auto" },
    { id: "Total", active: false, descending: true, flexing: "auto" },
  ];

  const tableContentsArr = [
    {
      saleDate: new Date(2022, 6, 13),
      invoice: 12333,
      store: 2233,
      lineItems: 2,
      total: "$123.45",
    },
    {
      saleDate: new Date(2022, 1, 19),
      invoice: 14373,
      store: 2233,
      lineItems: 4,
      total: "$420.69",
    },
  ];

  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

  const tableBodyContents = tableContentsArr.map((item) => {
    return (
      <tr key={item.invoice}>
        <td>{item.saleDate.toLocaleDateString("en-US", dateOptions)}</td>
        <td>{item.invoice}</td>
        <td>{item.store}</td>
        <td>{item.lineItems}</td>
        <td>{item.total}</td>
        <td>x</td>
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
        <p>Receipt List (coming soon)</p>
      <Table
        tableHeadingArray={headingList}
        tableBodyArray={tableBodyContents}
        hasItemAction={true}
      ></Table>

        </div>
      </section>
      <FooterContainer></FooterContainer>
    </section>
  );
};

export default SessionItems70;

/*

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

*/
