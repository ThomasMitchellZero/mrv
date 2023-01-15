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

const tenderizer = ( key, value ) => {
  switch (key) {
    case "cash": {
      return value;
    }
    case "creditCard": {
      return value;
    }
    case "Check": {
      return value;
    }

    default:
      throw new Error(`${key} is not a valid tender type`);
  }
};

export default tenderizer;
