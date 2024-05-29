
const FakeCashTotalBYD = () => {

  // if it can be derived from info in the moneyObj, then make some fields to do it.

  return (
    <section className={`cashTotal `}>
      <div className={`breakdownLabelsCol`}>
        <div  className={`body`}>
          Subtotal:
        </div>
        <div className={`body`}>
          Tax:
        </div>
      </div>
      <div className={`breakdownValsCol`}>
        <div className={`body bold `}>
          $516.38
        </div>
        <div className={`body bold `}>
          $46.53
        </div>
      </div>
      <div className={`totalCol `}>
        <div className={`body__small `}>
          Total Refund:
        </div>
        <div className={`heading__large`}>
            $562.91
        </div>
      </div>
    </section>
  );
};

export { FakeCashTotalBYD };
