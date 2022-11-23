const matched = {
  300: [{ quantity: 8, price: 44.05, payment: "cash" }],
  400: [
    { quantity: 6, price: 21.21, payment: "credit" },
    { quantity: 8, price: 23.23, payment: "debit" },
  ],
};

const matchEligible = {
  300: [{ quantity: 8, price: 44.05, payment: "cash" }],
  400: [
    { quantity: 6, price: 21.21, payment: "credit" },
    { quantity: 8, price: 23.23, payment: "debit" },
  ],
};

const unmatched = {
    300: {quantity: 2}
}