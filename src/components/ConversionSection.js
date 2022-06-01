// import "./App.css";
import { useState, useEffect } from "react";

import Dropdown from "./Dropdown";
import {
  useBaseCurr,
  useTargerCurr,
  useExchangeRate,
} from "../contexts/Context";
import currencyCodeData from "../constants/currencyCodeData";
import InputAmount from "./InputAmount";
import { getRequest, postRequest } from "../contexts/APIs";

export default function ConversionSection() {
  const [baseCurr, setBaseCurr] = useBaseCurr();
  const [targetCurr, setTargetCurr] = useTargerCurr();
  const [exchangeRate, setExchangeRate] = useExchangeRate();
  const [baseAmt, setBaseAmt] = useState(1);
  const [targetAmt, setTargetAmt] = useState(null);

  const handleConversion = () => {
    postRequest(baseAmt, baseCurr, targetAmt, targetCurr);
    getRequest();
  };

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
      <button onClick={handleConversion}>Convert</button>
    </>
  );
}
