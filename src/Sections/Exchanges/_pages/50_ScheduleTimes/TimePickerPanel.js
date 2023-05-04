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
    console.log(timeBtnObj);
    setLocSt((draft) => {
      const ddd = current(draft);
      //console.log(ddd)
      draft.activeTimeBtnObj = timeBtnObj;
      draft.show30warning = false;
    });
  };

  /* ---- UI Elements ---- */

  // Fn to producethe range of date objects shown in table
  const makeDatesArr = ({ month = 8, startDate = 2, endDate = 16 }) => {
    const outArr = [];
    for (let i = startDate; i <= endDate; i++) {
      const thisDate = new Date(2023, month, i);
      outArr.push(thisDate);
    }
    return outArr;
  };

  // Fn to produce a row with all buttons for a specific day.
  const makeBtnRow = ({ date, month }) => {
    const timeSlotArr = ["8-11 am", "11-2 pm", "2-5 pm", "5-8 pm", "8-11 pm"];

    const outBtnArr = timeSlotArr.map((timeStr) => {
      const keyString = `${date}${month}${timeStr}`;

      // Clicking button stores this obj in local state.  If user hits Apply, it will be passed from local to global.
      const btnDataObj = {
        keyStr: keyString,
        timeSlot: timeStr,
        date: date,
        month: month,
        fart: "Fartrell",
      };

      // If this unique keyStr matches local, apply "focused" style
      const isActive =
        localSt.activeTimeBtnObj?.keyStr === keyString ? "focused" : "";

      return (
        <section
          key={btnDataObj.keyStr}
          className={`${classes.timeBtnContainer}`}
        >
          <button
            onClick={() => handleTimeBtnClick(btnDataObj)}
            className={`mrvBtn secondary fullWidth ${isActive} ${classes.timeBtn}`}
          >{`${timeStr}`}</button>
        </section>
      );
    });
    return outBtnArr;
  };

  //Arr of all Date objs
  const allDatesArr = makeDatesArr({ month: 3, startDate: 3, endDate: 21 });

  //Arr made from applying makeBtnRow() to array of Date objects
  const allUIdayRowsArr = allDatesArr.map((thisDateObj) => {
    // these two values are indexes, so get the corresponding string.
    const thisMonth = monthArr[thisDateObj.getMonth()];
    // TODO - I think it's a template literal for the comma?
    const wkday = `${weekdayArr[thisDateObj.getDay()]},`;
    const thisDate = thisDateObj.getDate();

    // call the fn() to make the button row for today.
    const thisDayBtnRow = makeBtnRow({ date: thisDate, month: thisMonth });

    return (
      <section
        key={`${thisMonth}${thisDate}`}
        className={`${classes.dateBtnRow}`}
      >
        <section className={`${classes.dateText}`}>
          <p className={`body`}>{wkday}</p>
          <p className={`body ${classes.month}`}>{thisMonth}</p>
          <p className={`body`}>{thisDate}</p>
        </section>
        {thisDayBtnRow}
      </section>
    );
  });

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


  /*
  
  */

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

      <section className={` ${classes.buttonWindow}`}>{allUIdayRowsArr}</section>
    </section>
  );
}

export { TimePickerPanel };
