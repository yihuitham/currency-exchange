import React, { createContext, useContext, useState, useEffect } from "react";

const BaseCurrContext = createContext();
const TargetCurrContext = createContext();

export function useBaseCurr() {
  return useContext(BaseCurrContext);
}

export function useTargerCurr() {
  return useContext(TargetCurrContext);
}

export default function SelectedDataProvider({ children }) {
  const [baseCurr, setbaseCurr] = useState("USD");
  const [targetCurr, setTargetCurr] = useState("");

  return (
    <BaseCurrContext.Provider value={[baseCurr, setbaseCurr]}>
      <TargetCurrContext.Provider value={[targetCurr, setTargetCurr]}>
        {children}
      </TargetCurrContext.Provider>
    </BaseCurrContext.Provider>
  );
}
