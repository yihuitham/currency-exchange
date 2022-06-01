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
        <Amount
          name="baseAmt"
          value={targetAmt}
          setValue={null}
          disabled="true"
        />
      </div>

      <button onClick={handleConversion}>Convert</button>
    </div>
  );
}
