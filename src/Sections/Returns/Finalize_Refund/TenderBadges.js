import classes from "./TenderBadges.module.css";
import {
  MdCreditCard,
  MdCardGiftcard,
  MdPayments,
  MdEast,
} from "react-icons/md";

import { CiMoneyCheck1 } from "react-icons/ci";

import { FaMoneyCheckAlt } from "react-icons/fa";

import tType from "../../../components/global_functions/tenderTypes";

const badgesObj = {
  [tType.cash]: {
    icon: <MdPayments size="6rem" className={`${classes.icon}`} />,
    label: "Cash",
  },
  [tType.check]: {
    icon: <CiMoneyCheck1 size="6rem" className={`${classes.icon}`} />,
    label: "Check",
  },
  [tType.credit]: {
    icon: <MdCreditCard size="6rem" className={`${classes.icon}`} />,
    label: "Credit Card",
  },
  [tType.debit]: {
    icon: <MdCreditCard size="6rem" className={`${classes.icon}`} />,
    label: "Debit Card",
  },
  [tType.storeCredit]: {
    icon: <MdCardGiftcard size="6rem" className={`${classes.icon}`} />,
    label: "Store Credit",
  },
};

const TenderBadges = ({ tender1, tender2 = null }) => {
  // make a badge if input is true, else null
  const badger = (tender) => {
    const output = tender ? (
      <section className={`${classes.badge}`}>
        {badgesObj[tender].icon}
        <h4>{badgesObj[tender].label}</h4>
      </section>
    ) : null;
    return output;
  };

  // If 2nd tender is specified, UI also needs an arrow.
  const arrow = tender2 ? <MdEast size="1rem" className={`${classes.icon}`} /> : null

  const allBadgesArr = [
    badger(tender1),
    arrow,
    badger(tender2),
  ];

  return <section className={`${classes.container}`}>{allBadgesArr}</section>;
};

export default TenderBadges;
