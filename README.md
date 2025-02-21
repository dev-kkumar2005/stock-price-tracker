# Stock Price Tracker

A real-time stock price tracking web application built using React, TypeScript, WebSockets, and Material-UI.

Features

📈 Real-time stock price updates using WebSockets.

🔍 Search and track multiple stocks.

📊 Stock price chart using Chart.js/Recharts.

🌙 Dark mode support.

🎨 Responsive UI with Material-UI and Tailwind CSS.

Technologies Used

React (TypeScript)

WebSockets

Material-UI / Tailwind CSS

Chart.js / Recharts

Alpha Vantage API for stock data

Axios for API requests

Installation & Setup

Clone the repository:

git clone https://github.com/your-username/stock-price-tracker.git
cd stock-price-tracker

Install dependencies:

npm install

Set up environment variables:

Create a .env file in the root directory and add:

REACT_APP_API_KEY=your_alpha_vantage_api_key
REACT_APP_WEBSOCKET_URL=wss://your-websocket-server

Run the app:

npm start

The app will be available at http://localhost:3000/.

API Usage

This project uses Alpha Vantage API for stock market data. You need an API key to fetch stock prices.

Example API call:

https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=your_api_key

Contributing

Feel free to fork this repository and contribute by submitting pull requests. 🚀

License

This project is licensed under the MIT License.