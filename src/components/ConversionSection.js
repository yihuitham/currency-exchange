// import "./App.css";
import { useState, useEffect } from "react";

import Dropdown from "./Dropdown";
import {
  useBaseCurr,
  useTargerCurr,
  useExchangeRate,
  useHistory,
} from "../contexts/Context";
import currencyCodeData from "../constants/currencyCodeData";
import Amount from "./Amount";
import { fetchExchangeRate, getRequest, postRequest } from "../contexts/APIs";
import HistoryTable from "./HistoryTable";

export default function ConversionSection() {
  const [baseCurr, setBaseCurr] = useBaseCurr();
  const [targetCurr, setTargetCurr] = useTargerCurr();
  const [exchangeRate, setExchangeRate] = useExchangeRate();
  const [history, setHistory] = useHistory();

  const [baseAmt, setBaseAmt] = useState(1);
  const [targetAmt, setTargetAmt] = useState();

  function to2Decimal(value) {
    return Math.floor(value * 100) / 100;
  }

  const handleConversion = async () => {
    try {
      const getTargetAmt = to2Decimal(exchangeRate * baseAmt);
      setTargetAmt(getTargetAmt);
      await postRequest(baseAmt, baseCurr, getTargetAmt, targetCurr);
      const historyData = await getRequest();
      setHistory(historyData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(history);

  useEffect(() => {
    const getExchangeRate = async () => {
      const rate = await fetchExchangeRate(baseCurr, targetCurr);
      await setExchangeRate(rate);
    };
    getExchangeRate();
  }, [baseCurr, targetCurr]);
  return (
    <>
      <div className="flex justify-center items-center bg-black h-screen text-white">
        <div className="grid grid-cols-2 gap-6">
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
            <div className="text-center my-2 text-zinc-300">
              {baseCurr} 1 = {targetCurr} {exchangeRate}
            </div>
          </div>
          <div className="col-span-2 h-40">
            <div className="text-center font-bold mb-3">Past Queries</div>
            <div className="col-span-2 h-40">
              {history ? <HistoryTable data={history} /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
