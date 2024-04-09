import "./_Dispositions.css";

import { TitleBarSTRX, CashTotalSTRX } from "../../_resources/components/CompConfigsSTRX";
import { useImmer } from "use-immer";
import { useNodeNavSTRX } from "../../_resources/hooks/STRXhooks";
import { useOutletContext } from "react-router";


function DispoMainPageSTRX() {

    const strxCtx = useOutletContext();
    const sessionState = strxCtx.sessionSTRX;


    return (
        <section className={` mrvPage color__surface__subdued`}>
          <main className={`mrvPanel__main`}>
            <TitleBarSTRX
              //hasIcon={"back"}
              showProductName={true}
              headerTitle={`Provide reason for return`}
              showNavNodeBar={true}
            />
            <div className={`main_content`}>
              test
            </div>
            <CashTotalSTRX mode={"exchDelta"} sessionState={sessionState} />
          </main>
        </section>
      );
}

export { DispoMainPageSTRX };
