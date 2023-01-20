import tender from "./tendersPrime"

const ref = {
  cash: { tenderLabel: "Cash", paid: 0 },
  creditCard: {
    tenderLabel: "American Express ****4444",
    paid: 0,
    ccNum: "3333444433334444",
  },
  check: {
    tenderLabel: "Check ****4321",
    paid: 0,
    routing: "12341234",
    account: "43214321",
  },
};

// if I want, I can generate the tender labels in the Tenderizer.

const tenderizer = ( key, value ) => {
  switch (key) {
    case "cash": {
      return {...value, 
        refundOptions: "cash",
        refundOptionLabel: "Cash"};
    }
    case "debit": {
      return {...value};
    }
    case "creditCard": {
      return {...value};
    }
    case "check": {
      return {...value};
    }
    case "merchCard": {
      return {...value};
    }

    default:
      return {...value};
  }
};

export default tenderizer;
