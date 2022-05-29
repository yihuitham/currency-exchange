// import "./App.css";
import Dropdown from "./components/Dropdown";

import currencyCodeData from "./currencyCodeData";

function App() {
  return (
    <>
      <Dropdown data={currencyCodeData} element="code" />
    </>
  );
}

export default App;
