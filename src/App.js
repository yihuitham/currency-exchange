// import "./App.css";
import Dropdown from "./components/Dropdown";
import {
  useBaseCurr,
  useTargerCurr,
  useExchangeRate,
} from "./contexts/Context";

import currencyCodeData from "./constants/currencyCodeData";

export default function App() {
  const [baseCurr, setBaseCurr] = useBaseCurr();
  const [targetCurr, setTargetCurr] = useTargerCurr();
  const [exchangeRate, setExchangeRate] = useExchangeRate();

  return (
    <>
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
      <>{exchangeRate}</>
    </>
  );
}
