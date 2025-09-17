import React, { useState } from "react";
import axios from "axios";
import "../App.css"; 

const Finance = () => {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [exchange, setExchange] = useState("USD");
  const [result, setResult] = useState(0);

  const base_url = "https://api.freecurrencyapi.com/v1/latest";
  const APIKEY = import.meta.env.VITE_API_KEY;

  const callApi = async () => {
    try {
      const response = await axios.get(
        `${base_url}?apikey=${APIKEY}&base_currency=${currency}`
      );
      const converted = response.data.data[exchange] * amount;
      setResult(converted);
    } catch (err) {
      console.error("API çağrısı başarısız:", err);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h2 className="title">💱 Döviz Çevirici</h2>

        <input
          type="number"
          value={amount}
          onChange={(e: any) => setAmount(Number(e.target.value))}
          placeholder="Miktar gir"
          className="input"
        />

        <div className="selectors">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="select"
          >
            <option value="USD">USD</option>
            <option value="TRY">TRY</option>
            <option value="EUR">EUR</option>
          </select>

          <span className="arrow">➡️</span>

          <select
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
            className="select"
          >
            <option value="USD">USD</option>
            <option value="TRY">TRY</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <input
          type="text"
          value={result ? result.toFixed(2) : ""}
          readOnly
          className="input result"
        />

        <button onClick={callApi} className="button">
          Çevir
        </button>
      </div>
    </div>
  );
};

export default Finance;
