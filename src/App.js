import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function App() {
  const [data, setData] = useState({});
  const [stock, getStock] = useState('');
  const url = `https://api.twelvedata.com/time_series?symbol=${stock}&interval=1min&apikey={apikey}`;
  const setStock = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        getStock('');
        console.log(data.values[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dateMe = (value) => {
    let arr = value.split(' ');
    let d = arr[0];
    let finalDate = formatDate(d);
    return finalDate;
  };
  const decimal = (value) => {
    const decimalPrice = parseFloat(value);
    const finalval = decimalPrice.toFixed(2);
    return finalval;
  };
  const formatDate = (userDate) => {
    let splitDates = userDate.split('-');
    let formatted = format(
      new Date(splitDates[0], splitDates[1] - 1, splitDates[2]),
      'MM/dd/yyyy'
    );
    return formatted;
  };

  return (
    <div className="App">
      <h1 className="mainHeader">US Stock Market Search</h1>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Enter a stock's symbol"
          value={stock}
          onChange={(event) => {
            getStock(event.target.value);
          }}
        />
        <button className="searchButton" onClick={setStock}>
          Search
        </button>
      </div>
      <div className="outputContainer">
        {data.meta ? <h2 className="symbol">{data.meta.symbol}</h2> : null}
        {data.values ? (
          <h3 className="date">{dateMe(data.values[0].datetime)}</h3>
        ) : null}
        <div className="stockPrice">
          {data.values ? (
            <h4 className="date">Open: ${decimal(data.values[0].open)}</h4>
          ) : null}
          {data.values ? (
            <h4 className="date">High: ${decimal(data.values[0].high)}</h4>
          ) : null}
          {data.values ? (
            <h4 className="date">Close: ${decimal(data.values[0].open)}</h4>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
