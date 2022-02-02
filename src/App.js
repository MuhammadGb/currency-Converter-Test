import React, { useMemo, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  padding-top: 3rem;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  .container {
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: darkgray;
  }
  .verticalSpacing {
    margin: 1rem 0rem;
  }
  .sideSpacing {
    margin: 0rem 1rem;
  }
  .convertTitle {
    font-size: 20px;
  }
  .inputWidth {
    width: 18rem;
    height: 2.5rem;
    border-radius: 0.3rem;
  }
  select,
  input:focus {
    outline: none;
  }
  .select {
    border: 0.5px solid lightgray;
    background: lightgray;
  }
  .input {
    border: 0.5px solid skyblue;
    font-size: 1rem;
  }
  .button {
    background-color: mediumpurple;
    color: white;
    border: none;
    font-size: 1.4rem;
    font-weight: 700;
    cursor: pointer;
  }
  .resultsBox {
    background-color: mediumslateblue;
    height: 50vh;
    width: 20rem;
    border-radius: 1rem;
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    .container {
      flex-direction: column;
    }
  }
`;

export default function App() {
  const [value, setValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("NGN");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies] = useState(["NGN", "EUR", "USD", "CAD"]);
  const [result, setResult] = useState(0);

  const fromCurrencies = useMemo(() => {
    return currencies.filter((c) => c !== toCurrency);
  }, [currencies, toCurrency]);

  const toCurrencies = useMemo(() => {
    return currencies.filter((c) => c !== fromCurrency);
  }, [currencies, fromCurrency]);

  const convert = async (e) => {
    e.preventDefault();
    const formValid = +value >= 0 && fromCurrency && toCurrency;
    if (!formValid) {
      return;
    }
    const res = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${fromCurrency}`
    );
    const { rates } = await res.json();
    setResult(+value * rates[toCurrency]);
  };

  return (
    <Wrapper onSubmit={convert}>
      <p className="convertTitle">Convert from one to another currency</p>
      <div className="container">
        <div>
          <select
            className="selectOne verticalSpacing select inputWidth"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {fromCurrencies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <div>
            <input
              className="inputWidth input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <select
              className="selectTwo verticalSpacing select inputWidth"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {toCurrencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              className="inputWidth verticalSpacing input"
              value={result}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button className="inputWidth verticalSpacing button" type="submit">
            convert
          </button>
        </div>
        <div className="resultsBox">
          <h3>
            You are converting: {value} {fromCurrency}
          </h3>
          <h3>
            You will get: {result.toFixed(2)} {toCurrency}
          </h3>
        </div>
      </div>
    </Wrapper>
  );
}
