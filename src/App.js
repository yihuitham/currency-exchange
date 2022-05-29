// import "./App.css";
import Dropdown from "./components/Dropdown";
import { useBaseCurr } from "./contexts/Context";

import currencyCodeData from "./constants/currencyCodeData";

function App() {
  const [baseCurr, setbaseCurr] = useBaseCurr();
  return (
    <>
      <Dropdown
        data={currencyCodeData}
        element="code"
        curr={baseCurr}
        setCurr={setbaseCurr}
      />
    </>
  );
}

export default App;
