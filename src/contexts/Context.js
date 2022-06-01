import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrencyAPIURL } from "./APIs";

const BaseCurrContext = createContext();
const TargetCurrContext = createContext();
const ExchangeRateContext = createContext();

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

export default function SelectedDataProvider({ children }) {
  const [baseCurr, setBaseCurr] = useState("SGD");
  const [targetCurr, setTargetCurr] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getCurrencyAPIURL(baseCurr, targetCurr));
        const data = await response.json();
        setExchangeRate(data.data[targetCurr].value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(getCurrencyAPIURL(baseCurr, targetCurr));
  return (
    <BaseCurrContext.Provider value={[baseCurr, setBaseCurr]}>
      <TargetCurrContext.Provider value={[targetCurr, setTargetCurr]}>
        <ExchangeRateContext.Provider value={[exchangeRate, setExchangeRate]}>
          {children}
        </ExchangeRateContext.Provider>
      </TargetCurrContext.Provider>
    </BaseCurrContext.Provider>
  );
}
