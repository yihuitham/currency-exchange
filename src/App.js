import React from "react";
import ConversionSection from "./components/ConversionSection";
import IntroductionSection from "./components/IntroductionSection";

export default function App() {
  return (
    <div className="flex">
      <div className="w-1/2">
        <IntroductionSection />
      </div>
      <div className="w-1/2">
        <ConversionSection />
      </div>
    </div>
  );
}
