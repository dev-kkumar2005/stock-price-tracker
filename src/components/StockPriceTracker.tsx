import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "chart.js/auto";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface StockData {
  symbol: string;
  price: number;
  change: number;
}

const StockPriceTracker: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [symbol, setSymbol] = useState<string>("IBM");
  const [trackedSymbols, setTrackedSymbols] = useState<string[]>([
    "IBM",
    "AAPL",
  ]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const socket = io("wss://your-websocket-server");

  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=demo`
        );

        if (!response.data || !response.data["Time Series (5min)"]) {
          throw new Error("Invalid API response");
        }

        const timeSeries = response.data["Time Series (5min)"];
        const latestTime = Object.keys(timeSeries)[0];

        if (!latestTime || !timeSeries[latestTime]) {
          throw new Error("No valid stock data found");
        }

        const latestData = timeSeries[latestTime];

        setStocks([
          {
            symbol,
            price: parseFloat(latestData["1. open"]),
            change:
              parseFloat(latestData["4. close"]) -
              parseFloat(latestData["1. open"]),
          },
        ]);
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 10000);
    return () => clearInterval(interval);
  }, [trackedSymbols]);

  useEffect(() => {
    socket.on("stockUpdate", (data: StockData) => {
      setStocks((prev) =>
        prev.map((stock) => (stock.symbol === data.symbol ? data : stock))
      );
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const addStock = () => {
    if (symbol && !trackedSymbols.includes(symbol.toUpperCase())) {
      setTrackedSymbols([...trackedSymbols, symbol.toUpperCase()]);
    }
    setSymbol("");
  };

  return (
    <div
      className={
        darkMode ? "bg-gray-900 text-white p-4" : "bg-white text-black p-4"
      }
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle Dark Mode
      </Button>
      <Typography variant="h4" className="text-center my-4">
        Stock Price Tracker
      </Typography>
      <div className="flex space-x-2 mb-4">
        <TextField
          label="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          variant="outlined"
        />
        <Button variant="contained" color="secondary" onClick={addStock}>
          Add Stock
        </Button>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell
                    className={
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stock.change.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockPriceTracker;
