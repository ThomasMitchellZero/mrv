import { HeaderSTRX } from "../../_resources/components/HeaderSTRX";

import { useNavigate } from "react-router";

function AllEntry30() {
  const navigate = useNavigate();

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPanel__side`}>
      <HeaderSTRX headerTitle={"Scan Or Enter Invoices"} />
      <div className={`main_content gap2rem alignLeft`}></div>
      <section className={`footer_content`}>
        <div className={`buttonBox`}>
          <button type="submit" className={`mrvBtn primary fullWidth jumbo`}>
            Apply
          </button>
        </div>
      </section>
    </section>
  );
}

export { AllEntry30 }; 

/*



*/
