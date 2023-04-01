import "../../mrv-styles/mrvAllStyles.css";

import { useImmer } from "use-immer";
import produce from "immer";

function Exchanges() {
  const [exchSession, setExchSession] = useImmer();

  const handleCLick = () => {
    console.log("clicked");
  };

  return (
    <section className={`mrv mrv-primary-grid`}>
      I'm in.<button onClick={handleCLick}></button>
    </section>
  );
}

export default Exchanges;
