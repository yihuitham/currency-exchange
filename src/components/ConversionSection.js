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
  const [baseAmt, setBaseAmt] = useState(null);
  const [targetAmt, setTargetAmt] = useState(null);
  const [history, setHistory] = useState(null);

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
    setHistory(getRequest());
  };

  //   useEffect(() => {
  //     setTargetAmt(baseAmt * exchangeRate);
  //     console.log(baseAmt);
  //   }, []);

  return (
    <div className="flex justify-center items-center bg-black h-screen text-white">
      <div className="grid grid-cols-2 gap-6 place-items-stretch">
        <div className="">
          <Dropdown
            data={currencyCodeData}
            element="code"
            curr={baseCurr}
            setCurr={setBaseCurr}
            label="I'd like to send"
          />
        </div>

        <div className="self-end">
          <Amount name="baseAmt" value={baseAmt} setValue={setBaseAmt} />
        </div>

        <div className="">
          <Dropdown
            data={currencyCodeData}
            element="code"
            curr={targetCurr}
            setCurr={setTargetCurr}
            label="And receive in"
          />
        </div>

        <div className="font-bold text-lg self-end text-white text-center">
          {targetAmt}
        </div>
        <div className="col-span-2">
          <button
            className="w-full h-12 rounded-xl bg-white text-black text-lg font-bold"
            onClick={handleConversion}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}
