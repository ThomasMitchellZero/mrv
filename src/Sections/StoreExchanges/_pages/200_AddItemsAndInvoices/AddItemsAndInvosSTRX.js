import { HeaderSTRX } from "../../_resources/components/HeaderSTRX";

import { useNavigate } from "react-router";

function AddItemsAndInvosSTRX() {
  const navigate = useNavigate();

  /* ---- SHARED FUNCTIONS ---- */

  /* ---- OUTPUT JSX ---- */

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <HeaderSTRX headerTitle={"Add Items And Invoices"} />
        <div className={`main_content gap2rem alignLeft`}>
        </div>
      </section>
    </section>
  );
}

export { AddItemsAndInvosSTRX };

/*



*/
