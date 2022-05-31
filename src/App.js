// import "./App.css";
import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import {
  useBaseCurr,
  useTargerCurr,
  useExchangeRate,
} from "./contexts/Context";

import currencyCodeData from "./constants/currencyCodeData";
import InputAmount from "./components/InputAmount";

// function to2Decimals(value) {
//   return Math.round(value * 100) / 100;
// }

export default function App() {
  const [baseCurr, setBaseCurr] = useBaseCurr();
  const [targetCurr, setTargetCurr] = useTargerCurr();
  const [exchangeRate, setExchangeRate] = useExchangeRate();
  const [baseAmt, setBaseAmt] = useState(1);
  const [targetAmt, setTargetAmt] = useState(null);

  const getRequest = async () => {
    try {
      const response = await fetch(
        "https://dyj6i4wuc7.execute-api.ap-southeast-1.amazonaws.com/dev/"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postRequest = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseAmt: baseAmt,
        baseCurr: baseCurr,
        targetAmt: targetAmt,
        targetCurr: targetCurr,
      }),
    };
    try {
      const response = await fetch(
        "https://dyj6i4wuc7.execute-api.ap-southeast-1.amazonaws.com/dev/",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(targetAmt);

  useEffect(() => {
    setTargetAmt(baseAmt * exchangeRate);
  });

  return (
    <>
      <div className="flex">
        <InputAmount
          className="bg-gray-100"
          name="baseAmt"
          value={baseAmt}
          setValue={setBaseAmt}
        />
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
      <button onClick={postRequest}>Convert</button>
      <button onClick={getRequest}>Get Request</button>
    </>
  );
}
