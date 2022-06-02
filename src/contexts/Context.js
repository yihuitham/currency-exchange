import React, { createContext, useContext, useState, useEffect } from "react";
import { getRequest } from "./APIs";

const API_KEY = "SWfwu5jR2RPfybJz4QJkCnZKxlzE3h6pUdtUcpbY";
const BaseCurrContext = createContext();
const TargetCurrContext = createContext();
const ExchangeRateContext = createContext();
const HistoryContext = createContext();

export function getCurrencyAPIURL(base, target) {
  if (target === "") {
    return;
  }
  return `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&currencies=${target}&base_currency=${base}`;
}

// {
//   "meta": {
//     "last_updated_at": "2022-05-30T23:59:59Z"
//   },
//   "data": {
//     "SGD": {
//       "code": "SGD",
//       "value": 1.36699
//     }
//   }
// }

export function useBaseCurr() {
  return useContext(BaseCurrContext);
}

export function useTargerCurr() {
  return useContext(TargetCurrContext);
}

export function useExchangeRate() {
  return useContext(ExchangeRateContext);
}

export function useHistory() {
  return useContext(HistoryContext);
}

export default function SelectedDataProvider({ children }) {
  const [baseCurr, setBaseCurr] = useState("SGD");
  const [targetCurr, setTargetCurr] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState("");
  const [history, setHistory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getCurrencyAPIURL(baseCurr, targetCurr));
        const data = await response.json();
        setExchangeRate(data.data[targetCurr].value);
        const historyData = await getRequest();
        setHistory(historyData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(getCurrencyAPIURL(baseCurr, targetCurr));
  console.log(exchangeRate);
  return (
    <BaseCurrContext.Provider value={[baseCurr, setBaseCurr]}>
      <TargetCurrContext.Provider value={[targetCurr, setTargetCurr]}>
        <ExchangeRateContext.Provider value={[exchangeRate, setExchangeRate]}>
          <HistoryContext.Provider value={[history, setHistory]}>
            {children}
          </HistoryContext.Provider>
        </ExchangeRateContext.Provider>
      </TargetCurrContext.Provider>
    </BaseCurrContext.Provider>
  );
}
