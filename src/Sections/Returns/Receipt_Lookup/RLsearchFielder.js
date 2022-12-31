import RL1LineField from "./RL1LineField";

const RLsearchFielder = ({ activeType, minEffort }) => {
  const outObj = {
    creditCard: (
      <RL1LineField
        validLength={16}
        invoMatchStr="creditCard"
        invalidMsg="Enter valid credit card number"
        fieldLabel="Enter credit card number or swipe to search"
        fieldPlaceholder="Credit card #"
        didMinimum={minEffort}
      />
    ),
  };
  return outObj[activeType] ?? <div>still working on it</div>;
};

export default RLsearchFielder;

/*

    creditCard: baseSearcher({
      defMatchFunc: function (invoiceNum, matchPath) {
        if (invoiceNum?.[matchPath]) return invoiceNum;
      },

*/
