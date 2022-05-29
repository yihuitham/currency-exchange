// import "./App.css";
import Dropdown from "./components/Dropdown";
import { useBaseCurr, useTargerCurr } from "./contexts/Context";

import currencyCodeData from "./constants/currencyCodeData";

function App() {
  const [baseCurr, setbaseCurr] = useBaseCurr();
  const [targetCurr, setTargetCurr] = useTargerCurr();

  return (
    <>
      <Dropdown
        data={currencyCodeData}
        element="code"
        curr={baseCurr}
        setCurr={setbaseCurr}
        label="Base Currency"
      />
      <Dropdown
        data={currencyCodeData}
        element="code"
        curr={targetCurr}
        setCurr={setTargetCurr}
        label="Target Currency"
      />
    </>
  );
}

export default App;
