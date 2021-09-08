import React from "react";

//props
const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  readOnlyMode,
  exchangeRateHandler,
  fromValue,
}) => {
  return (
    <div>
      <input
        type="number"
        className="inputBTN"
        readOnly={readOnlyMode}
        value={fromValue}
        onChange={exchangeRateHandler}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => {
          return <option value={option}>{option}</option>; //key={option} throw another error for 2 similar keys
        })}
      </select>
    </div>
  );
};

export default CurrencyRow;
