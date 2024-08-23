import { DescriptorIcon } from "../../../../../mrv/mrv-components/DisplayOutputs/DescriptorIcon";

import { centsToDollars, greenify } from "../../../../../mrv/MRVhooks/MRVhooks";

function ItemReceiptRow(atomizedItem) {
  // invoStatus will eventually include NRR Lifetime Warranty.
  const invoStatus = atomizedItem.atomInvoNum ? "receipted" : "needsReceipt";
  const moneyObj = atomizedItem.atomMoneyObj;
  const unitBaseValue = moneyObj.unitBaseValue;
  const itemQty = atomizedItem.atomItemQty;
  const totalValue = unitBaseValue * itemQty;

  const oConfigs = {
    receipted: {
      invoStr: `#${atomizedItem.atomInvoNum}`,
      invoColor: "color__primary__text",
      color: greenify(unitBaseValue),
      iconStr: "receipt",
      unitVal: `$${centsToDollars(unitBaseValue)}`,
      totalVal: `$${centsToDollars(totalValue)}`,
    },
    needsReceipt: {
      invoStr: "Needs Receipt",
      invoColor: "color__red__text",
      color: "color__red__text",
      iconStr: "alert",
      unitVal: "- -",
      totalVal: "- -",
    },
  };

  const config = oConfigs[invoStatus];

  const iconStyle = {
    ctnrSize: "1.5rem",
    fontSize: "1rem",
    color: config.invoColor,
  };

  // greenify neg. values because they are stored as positive in the invoices.
  return (
    <div key={atomizedItem.primaryKey} className={`invoInfoRow`}>
      <DescriptorIcon {...iconStyle} />
      <div className={`body__small field receiptCol ${config.invoColor}`}>
        {`${config.invoStr}`}
      </div>
      <div className={`unitQtyCol field body keepSpace color__primary__text`}>
        {`${itemQty}   x`}
      </div>
      <div className={`unitPriceCol field body alignRight ${config.color}`}>
        {config.unitVal}
      </div>
      <div
        className={`totalPriceCol field alignRight body bold ${config.color}`}
      >
        {config.totalVal}
      </div>
    </div>
  );
}

export { ItemReceiptRow };
