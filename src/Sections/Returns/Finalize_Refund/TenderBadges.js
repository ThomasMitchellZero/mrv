import classes from "./TenderBadges.module.css";
import {
  MdCreditCard,
  MdCardGiftcard,
  MdPayments,
  MdEast,
} from "react-icons/md";

import { CiMoneyCheck1 } from "react-icons/ci";

import {FaMoneyCheck} from "react-icons/fa"

import tType from "../../../components/global_functions/tenderTypes";

const badgeProps = {
    size: "6rem",
    className: `grey-08-text ${classes.icon}`, 
}

const badgesObj = {
  [tType.cash]: {
    icon: <MdPayments {...badgeProps} />,
    label: "Cash",
  },
  [tType.check]: {
    icon: <FaMoneyCheck {...badgeProps} />,
    label: "Check",
  },
  [tType.credit]: {
    icon: <MdCreditCard {...badgeProps} />,
    label: "Credit Card",
  },
  [tType.debit]: {
    icon: <MdCreditCard {...badgeProps} />,
    label: "Debit Card",
  },
  [tType.storeCredit]: {
    icon: <MdCardGiftcard {...badgeProps} />,
    label: "Store Credit",
  },
};

const TenderBadges = ({ tender1, tender2 = null }) => {
  // make a badge if input is true, else null
  const badger = (tender, key) => {
    const output = tender ? (
      <section key={key} className={`${classes.badge}`}>
        {badgesObj[tender].icon}
        <h4 className={`grey-06-text`}>{badgesObj[tender].label}</h4>
      </section>
    ) : null;
    return output;
  };

  // If 2nd tender is specified, UI also needs an arrow.
  const arrow = tender2 ? <MdEast key="arrow" size="2rem" className={`grey-06-text`} /> : null

  const allBadgesArr = [
    badger(tender1, 1),
    arrow,
    badger(tender2, 2),
  ];

  return <section className={`${classes.container}`}>{allBadgesArr}</section>;
};

export default TenderBadges;
