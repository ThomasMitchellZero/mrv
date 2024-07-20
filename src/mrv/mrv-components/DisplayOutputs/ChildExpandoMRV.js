import React from "react";
import { useImmer } from "use-immer";

import { namedArray } from "../../../globalFunctions/globalJS_classes";
import { greenify, centsToDollars } from "../../MRVhooks/MRVhooks";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const ChildComponentsMRV = ({
  childrenUIarr = [],
  collapsed = false,
  moneyValInCents = null,
  greenifyMoney = true,
}) => {
  const defaultState = {
    isCollapsed: collapsed,
  };

  const oStateConfigs = {
    collapsed: {
      aUIchildren: [],
      btnString: `Hide`,
      icon: <MdExpandMore />,
      dollarVal: `$${centsToDollars(moneyValInCents)}`,
    },
    expanded: {
      aUIchildren: childrenUIarr,
      btnString: `Hide`,
      icon: <MdExpandLess />,
      dollarVal: null,
    },
  };

  const refNamedArray = namedArray({
    keyStr: "childrenUIarr",
    value: childrenUIarr,
  });

  const [expandoState, setExpandoState] = useImmer(defaultState);

  const stConfig = expandoState.isCollapsed
    ? oStateConfigs.collapsed
    : oStateConfigs.expanded;

  const toggleCollapsed = () => {
    setExpandoState((draft) => {
      draft.isCollapsed = !draft.isCollapsed;
    });
  };

  const uiMoney = (() => {
    // if no moneyVal, return don't render anything
    if (!moneyValInCents) return null;

    const moneyStr = `$${centsToDollars(moneyValInCents)}`;
    const greenClass = greenifyMoney ? `${greenify(moneyValInCents)}` : ``;
    return <div className={`${greenClass}`}>{stConfig.dollarVal}</div>;
  })();

  return (
    <div className={`vBox minFlex`}>
      <div className={`expandoHeader`}>
        <button className={`secondary miniBtn`} onClick={toggleCollapsed}>
          {stConfig.icon} {stConfig.btnString}
        </button>
      </div>

      <div className={`expandoBody`}></div>
    </div>
  );
};

export { ChildComponentsMRV };
