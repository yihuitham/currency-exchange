// import "./App.css";
import { useState, useEffect } from "react";

import Dropdown from "./Dropdown";
import {
  useBaseCurr,
  useTargerCurr,
  useExchangeRate,
} from "../contexts/Context";
import currencyCodeData from "../constants/currencyCodeData";
import Amount from "./Amount";
import { fetchExchangeRate, getRequest, postRequest } from "../contexts/APIs";

export default function ConversionSection() {
  const [baseCurr, setBaseCurr] = useBaseCurr();
  const [targetCurr, setTargetCurr] = useTargerCurr();
  const [exchangeRate, setExchangeRate] = useExchangeRate();
  const [baseAmt, setBaseAmt] = useState(1);
  const [targetAmt, setTargetAmt] = useState(null);

  function to2Decimal(value) {
    return Math.floor(value * 100) / 100;
  }

  const handleConversion = async () => {
    const getExchangeRate = await fetchExchangeRate(baseCurr, targetCurr);
    await setExchangeRate(getExchangeRate);
    console.log(exchangeRate);
    const getTargetAmt = to2Decimal(getExchangeRate * baseAmt);
    setTargetAmt(getTargetAmt);
    postRequest(baseAmt, baseCurr, getTargetAmt, targetCurr);
    getRequest();
  };

  //   useEffect(() => {
  //     setTargetAmt(baseAmt * exchangeRate);
  //     console.log(baseAmt);
  //   }, []);

  return (
    <div className="bg-black h-screen text-white">
      <div className="flex">
        <Dropdown
          data={currencyCodeData}
          element="code"
          curr={baseCurr}
          setCurr={setBaseCurr}
          label="I'd like to send"
        />
        <Amount name="baseAmt" value={baseAmt} setValue={setBaseAmt} />
      </div>
      <div className="flex">
        <Dropdown
          data={currencyCodeData}
          element="code"
          curr={targetCurr}
          setCurr={setTargetCurr}
          label="And receive in"
        />
        <div>{targetAmt}</div>
      </div>

      <button onClick={handleConversion}>Convert</button>
    </div>
  );
}
