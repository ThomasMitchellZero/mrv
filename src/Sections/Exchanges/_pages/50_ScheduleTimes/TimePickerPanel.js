import classes from "./TimePickerPanel.module.css";

import { weekdayArr, monthArr } from "../../_Resources/glossary/glossaryExch";

function TimePickerPanel({ localSt, setLocSt }) {
  /* ---- Shared Functions ---- */

  /* ---- Table Elements ---- */

  // generate <th>
  const thFactory = (title = "", width = "") => {
    return { title, width };
  };

  const thInputs = [
    thFactory("Return Product"),
    thFactory("Qty", "3rem"),
    thFactory(" ", "4rem"),
    thFactory("Replacement Product"),
    thFactory("Qty ", "3rem"),
    thFactory("Remove", "5rem"),
  ];

  const thArray = thInputs.map((th) => {
    return (
      <th key={th.title} style={{ width: th.width }}>
        {th.title}
      </th>
    );
  });

  // Generate <tr>s

  //// Times Table //////

  const makeDatesArr = ({ month = 8, startDate = 2, endDate = 16 }) => {
    const outArr = [];
    for (let i = startDate; i <= endDate; i++) {
      const thisDate = new Date(2023, month, i);
      outArr.push(thisDate);
    }
    return outArr;
  };

  const allDatesArr = makeDatesArr({ month: 3, startDate: 3, endDate: 21 });

  const timeSlotArr = [
    "8 - 11 am",
    "11 - 2 pm",
    "2 - 5 pm",
    "5 - 8 pm",
    "8 - 11 pm",
  ];

  const timeRowsArr = [];

  for (const i of allDatesArr) {
    const month = monthArr[i.getMonth()];
    const wkday = `${weekdayArr[i.getDay()]},`;
    const date = i.getDate();

    timeRowsArr.push(
      <section className={`${classes.dateBtnRow}`}>
        <section className={`${classes.dateText}`}>
          <p className={`body`}>{wkday}</p>
          <p className={`body ${classes.month}`}>{month}</p>
          <p className={`body`}>{date}</p>
        </section>
      </section>
    );
  }

  /* ---- Final Component ---- */

  return (
    <section className={` main_content main_col ${classes.container}`}>
      <section className={`${classes.itemTable}`}>
        <table>
          <thead>
            <tr>{thArray}</tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>

      <section className={` ${classes.buttonWindow}`}>{timeRowsArr}</section>
    </section>
  );
}

export { TimePickerPanel };
