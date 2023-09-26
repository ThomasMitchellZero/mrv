import classes from "./_ScheduleTimesCSS.module.css";

import { weekdayArr, monthArr } from "../../_Resources/glossary/glossaryExch";

import { ExchHeader } from "../../_Resources/components/pageLayout/ExchHeader";

import { MdArrowForward, MdOutlineCheckCircle } from "react-icons/md";

import { useOutletContext } from "react-router";

function TimePickerPanel({ parentLocSt, setparentLocSt, setDelivFn }) {
  const exchCtx = useOutletContext();
  const setExchState = exchCtx.setExchSession;
  const delivGroups = exchCtx.exchSession.deliveryGroups;
  const activeAppt = parentLocSt.activeKey;

  const applyWarning = parentLocSt.showApplyWarning;

  const timeSlotsObj = {
    3: ["8-11 am", "11-2 pm", "2-5 pm", "5-8 pm", "8-11 pm"],
    2: ["8-11 am", "2-5 pm"],
    1: ["8-6 pm"],
  };

  /* ---- Shared Functions ---- */

  // produces a 'random' arr of time slots by factors of the date.
  const makeTimeSlots = (date) => {
    const outTimeSlotArr =
      date % 3 === 0
        ? timeSlotsObj["3"]
        : date % 2 === 0
        ? timeSlotsObj["2"]
        : timeSlotsObj["1"];

    return outTimeSlotArr;
  };

  const handleTimeBtnClick = (timeBtnObj) => {
    setparentLocSt((draft) => {
      draft.activeTimeBtnObj = timeBtnObj;
      draft.showApplyWarning = false;
    });
  };

  const handeApply = (event) => {
    event.preventDefault();

    // this will be null if a time isn't active.
    const pickedTime = parentLocSt.activeTimeBtnObj;

    if (pickedTime) {
      setExchState((draft) => {
        draft.deliveryGroups[activeAppt].apptTime = pickedTime;
      });
      // clears active appt so ScheduledTimes can search for unscheduled
      setDelivFn(null);
    } else {
      // if no picked time, show the warning state.
      setparentLocSt((draft) => {
        draft.showApplyWarning = true;
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handeApply(event);
    }
  };

  // Fn to producethe range of date objects shown in table
  const makeDatesArr = ({ month = 8, startDate = 2, endDate = 16 }) => {
    const outArr = [];
    for (let i = startDate; i <= endDate; i++) {
      const thisDate = new Date(2023, month, i);
      outArr.push(thisDate);
    }
    return outArr;
  };

  //Arr of all Date objs
  const allDatesArr = makeDatesArr({ month: 3, startDate: 3, endDate: 21 });

  /* ---- UI Elements ---- */

  // Fn to produce a row with all buttons for a specific day.
  const makeBtnRow = ({ dayInfoObject }) => {
    // most of the info about the day comes from the day.
    const thisDayInfoObj = { ...dayInfoObject };
    const thisDate = thisDayInfoObj.date;

    const timeSlotArr = makeTimeSlots(thisDate);

    const outBtnArr = timeSlotArr.map((timeStr) => {
      // Clicking button stores this obj in local. Apply stores in session.
      const outBtnDataObj = { ...dayInfoObject, timeSlot: timeStr };
      outBtnDataObj.timeTxtStr = `${thisDayInfoObj.dayTextString}  : ${timeStr}`;

      const thisTimeString = outBtnDataObj.timeTxtStr;

      // If this unique timeTxtStr matches local, apply "focused" style
      const btnActiveStatus =
        parentLocSt.activeTimeBtnObj?.timeTxtStr === thisTimeString
          ? "focused"
          : "";

      return (
        <button
          key={thisTimeString}
          type="button"
          onClick={() => handleTimeBtnClick(outBtnDataObj)}
          className={`mrvBtn secondary ${btnActiveStatus} ${classes.timeBtn}`}
        >{`${timeStr}`}</button>
      );
    });
    return outBtnArr;
  };

  //Makes full Date element w/ data obj, plus title and time buttons.
  const allUIdayRowsArr = allDatesArr.map((thisDateObj) => {
    const outDayObj = {
      month: monthArr[thisDateObj.getMonth()],
      wkday: `${weekdayArr[thisDateObj.getDay()]}`,
      date: thisDateObj.getDate(),
    };

    outDayObj.dayTextString = `${outDayObj.wkday},  ${outDayObj.month}  ${outDayObj.date}`;

    // call the fn() to make the button row for today.
    const thisDayBtnRow = makeBtnRow({
      dayInfoObject: outDayObj,
    });

    return (
      <section
        key={`${outDayObj.dayTextString}`}
        className={`${classes.dayFullHolder}`}
      >
        <p className={`body bold keepSpace`}>{outDayObj.dayTextString}</p>
        <section className={`${classes.timeBtnContainer}`}>
          {thisDayBtnRow}
        </section>
      </section>
    );
  });

  /* ---- Final Component ---- */

  return (
    <section
      onKeyDown={handleKeyDown}
      id="tpForm"
      className={`mrvPanel__side exch-rows`}
    >
      <ExchHeader
        headerTitle="Exchange Items"
        hasCluster={false}
        hasProductName={false}
      />

      <section className={` ${classes.allTimesContainer}`}>
        {allUIdayRowsArr}
      </section>

      <section className={`footer_text`}>
        {applyWarning ? (
          <p className={`tinyText warning`}>Choose a time for exchange</p>
        ) : null}
      </section>
      <section className={`footer_content`}>
        <div className={`buttonBox`}>
          <button
            onClick={handeApply}
            type="button"
            className={`mrvBtn primary fullWidth jumbo`}
          >
            Apply
          </button>
        </div>
      </section>
    </section>
  );
}

export { TimePickerPanel };

/*






*/
