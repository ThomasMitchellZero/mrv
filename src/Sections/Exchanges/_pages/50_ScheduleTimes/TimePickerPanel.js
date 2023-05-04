import classes from "./TimePickerPanel.module.css";

import { weekdayArr, monthArr } from "../../_Resources/glossary/glossaryExch";

import { current } from "immer";

import { useOutletContext } from "react-router";

function TimePickerPanel({ localSt, setLocSt }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const exchProdsMap = exchCtx.exchSession.exchProducts;

  const activeKey = localSt.activeKey;
  const show30warning = localSt.show30warning;
  const activeTimeBtnObj = localSt.activeTimeBtnObj;

  /* ---- Shared Functions ---- */

  const handleTimeBtnClick = (timeBtnObj) => {
    console.log(timeBtnObj)
    setLocSt((draft) => {
      const ddd = current(draft)
      //console.log(ddd)
      draft.activeTimeBtnObj = timeBtnObj;
      draft.show30warning = false;
    });
  };

  /* ---- UI Elements ---- */

  



  const makeBtnRows = ({ date, month }) => {
    const timeSlotArr = ["8-11 am", "11-2 pm", "2-5 pm", "5-8 pm", "8-11 pm"];

    const outBtnArr = [];

    for (let timeIndex of timeSlotArr) {

      const btnDataObj = {
        keyStr: `${date}${month}${timeIndex}`,
        timeSlot: timeIndex,
        date: date,
        month: month,
        fart: "Fartrell",
      };

      const isActive =
        localSt.activeTimeBtnObj?.keyStr === btnDataObj.keyStr ? "focused" : "";

      outBtnArr.push(
        <section
          key={btnDataObj.keyStr}
          className={`${classes.timeBtnContainer}`}
        >
          <button
            onClick={() => handleTimeBtnClick(btnDataObj)}
            className={`mrvBtn secondary fullWidth ${isActive} ${classes.timeBtn}`}
          >{`${timeIndex}`}</button>
        </section>
      );
    }
    return outBtnArr;
  };



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

  const timeRowsArr = [];

  for (const i of allDatesArr) {
    const month = monthArr[i.getMonth()];
    const wkday = `${weekdayArr[i.getDay()]},`;
    const date = i.getDate();
    const btnRows = makeBtnRows({ date: date, month: month })
    console.log(btnRows);

    timeRowsArr.push(
      <section key={`${month}${date}`} className={`${classes.dateBtnRow}`}>
        <section className={`${classes.dateText}`}>
          <p className={`body`}>{wkday}</p>
          <p className={`body ${classes.month}`}>{month}</p>
          <p className={`body`}>{date}</p>
        </section>
        {btnRows}
      </section>
    );
  
  }

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
