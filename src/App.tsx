import React from "react";
import StockPriceTracker from "./components/StockPriceTracker";

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Live Stock Price Tracker</h1>
      <StockPriceTracker />
    </div>
  );
};

export default App;
