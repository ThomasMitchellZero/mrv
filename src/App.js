import "./App.css";
import "./app-styles/table.css";
import "./app-styles/buttons.css";
import "./app-styles/text-styles.css";
import "./app-styles/inputs.css";
import "./app-styles/dividers.css";
import "./app-styles/panels.css";
import "./app-styles/system-colors.css";
import "./app-styles/footer-styles.css";
import "./app-styles/drop-shadows.css";
import "./app-styles/scrim.css";

import { Route, Routes } from "react-router-dom";

// Global
import Main from "./components/UI/PageLayout/Main";
import Placeholder from "./Sections/Placeholder/Placeholder";

// Returns
import Returns from "./Sections/Returns/Returns";
import ReturnsIndex from "./Sections/Returns/Index/ReturnsIndex";
import FullItemReview from "./Sections/Returns/Review/FullItemReview";
import ReceiptLookup from "./Sections/Returns/Receipt_Lookup/ReceiptLookup";
import TotalReview from "./Sections/Returns/Total_Review/TotalReview";
import DeclineSlip from "./Sections/Returns/DeclineSlip/DeclineSlip";
import FinalizeRefund from "./Sections/Returns/Finalize_Refund/FinalizeRefund";
import SelectReceiptType from "./Sections/Returns/Select_Receipt/SelectReceiptType";

// Exchanges
import Exchanges from "./Sections/Exchanges/Exchanges";
import {ExchStartExchange} from "./Sections/Exchanges/_pages/10_StartExchange/StartExchange";
import {ExchChooseExchItems} from "./Sections/Exchanges/_pages/20_ChooseExchangeItems/ChooseExchangeItems";
import { ExchReason } from "./Sections/Exchanges/_pages/30_ExchReason/ExchReason";
import { ExchWhichForWhat } from "./Sections/Exchanges/_pages/40_WhichForWhat/WhichForWhat";
import { ExchScheduleTimes } from "./Sections/Exchanges/_pages/50_ScheduleTimes/ScheduleTimes";
import { ExchTotalReview } from "./Sections/Exchanges/_pages/60_TotalReview/TotalReview";

import { enableMapSet } from "immer";

enableMapSet();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="mrv" element={<Main />}>
          <Route index element={<Placeholder titleText="Home" />} />
          <Route path="home" element={<Placeholder titleText="Home" />} />
          <Route path="orders" element={<Placeholder titleText="Orders" />} />
          <Route
            path="showroom"
            element={<Placeholder titleText="Showroom" />}
          />
          <Route path="returns" element={<Returns />}>
            <Route index element={<ReturnsIndex></ReturnsIndex>} />
            <Route
              path="first-review"
              element={<FullItemReview pageStatus="preSearch" />}
            />
            <Route path="receipt-lookup" element={<ReceiptLookup />} />
            <Route
              path="unmatched-review"
              element={<FullItemReview pageStatus="postSearch" />}
            />
            <Route path="decline-slip" element={<DeclineSlip />} />
            <Route path="total-review" element={<TotalReview />} />
            <Route path="finalize-refund" element={<FinalizeRefund />} />
            <Route path="receipt" element={<SelectReceiptType />} />
          </Route>
          <Route path="exchanges" element={<Exchanges />}>
            <Route index element={<ExchStartExchange />} />
            <Route path="chooseitems" element={<ExchChooseExchItems />} />
            <Route path="exchreason" element={<ExchReason />} />
            <Route path="whichforwhat" element={<ExchWhichForWhat />} />
            <Route path="schedule" element={<ExchScheduleTimes />} />
            <Route path="totalreview" element={<ExchTotalReview />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
