// import "./App.css";
import Dropdown from "./components/Dropdown";
import {
  useBaseCurr,
  useTargerCurr,
  useExchangeRate,
} from "./contexts/Context";

import currencyCodeData from "./constants/currencyCodeData";
import { useState } from "react";
import InputAmount from "./components/InputAmount";

// function to2Decimals(value) {
//   return Math.round(value * 100) / 100;
// }

export default function App() {
  const [baseCurr, setBaseCurr] = useBaseCurr();
  const [targetCurr, setTargetCurr] = useTargerCurr();
  const [exchangeRate, setExchangeRate] = useExchangeRate();
  const [baseAmt, setBaseAmt] = useState(1);
  // const [targetAmt, setTargetAmt] = useState(baseAmt * exchangeRate);

  console.log(baseAmt);
  return (
    <>
      <div className="flex">
        <Dropdown
          data={currencyCodeData}
          element="code"
          curr={baseCurr}
          setCurr={setBaseCurr}
          label="Base Currency"
        />
        <Dropdown
          data={currencyCodeData}
          element="code"
          curr={targetCurr}
          setCurr={setTargetCurr}
          label="Target Currency"
        />
      </div>
      <>{exchangeRate}</>
      <InputAmount
        className="bg-gray-100"
        name="baseAmt"
        value={baseAmt}
        setValue={setBaseAmt}
      />
    </>
  );
}
