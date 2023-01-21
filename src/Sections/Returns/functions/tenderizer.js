import tender from "./tendersPrime";

const ref = {
  // Cash
  cash: { tenderLabel: "Cash", paid: 0 },

  // creditCard
  1111222211112222: {
    tenderLabel: "MasterCard ****2222",
    paid: 0,
    ccNum: "1111222211112222",
  },

  // Check
  44443333: {
    tenderLabel: "Check ****3333",
    paid: 0,
    routingNum: "44443333",
    accountNum: "33334444",
  },

  // Debit
  7777888877778888: {
    tenderLabel: "Debit ****8888",
    paid: 0,
    debitNum: "7777888877778888",
  },

  // Store Credit
  storeCredit: {
    paid: 0,
  },
};

// if I want, I can generate the tender labels in the Tenderizer.

const tenderizer = (key, value) => {
  if (key === "cash") {
    return {
      ...value,
      tenderLabel: "CasH MONEY",
    };
  }

  if (key === "storeCredit")
    return {
      ...value,
      tenderLabel: "STOOOORE Credit",
    };

  if (value.ccNum) {
    return {
      ...value,
      tenderLabel: "Credit Cartttt",
    };
  }

  if (value.debitNum) {
    return {
      ...value,
      tenderLabel: "Debit Collector",
    };
  }

  if (value.accountNum && value.routingNum) {
    return {
      ...value,
      tenderLabel: "You old AF",
    };
  }
};

export default tenderizer;
