import { useEffect, useState, useContext } from "react";
import CurrencyRow from "./CurrencyRow";
import axios from "axios";
import NotyfContext from "../../utill/NotyfContext";

const endPointUrl =
  "http://api.exchangeratesapi.io/v1/latest?access_key=25706e4963895296d663afa6f460215d";

const CurrencyConvert = () => {
  //notyf
  const notyf = useContext(NotyfContext);
  //check if user is logged
  const [userUID, setUserUID] = useState(localStorage.getItem("currentUser"));

  //for the selection display state
  const [currencyOptions, setCurrencyOptions] = useState([]); //get all the keys to populate the selectors
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");

  //for the input display + exchange logic state
  const [exchangeRate, setExchangeRate] = useState();
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();

  //get the data from an api
  useEffect(() => {
    axios.get(endPointUrl).then((res) => {
      setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]); //destruct the array from the endpoint to get the keys (currency name)
      setExchangeRate(res.data.rates);
    });
  }, []);

  //heres the magic happens
  const exchangeRateHandler = (e) => {
    setToValue(
      (exchangeRate[toCurrency] * Number(e.target.value)) /
        exchangeRate[fromCurrency]
    );
    setFromValue(Number(e.target.value));
  };

  //handle the save button
  const handleSave = async () => {
    try {
      if (!userUID) {
        notyf.error("Please log in");
        return null;
      }
      if (fromValue < 1 || fromValue === undefined) {
        notyf.error("please enter values");
        return null;
      }
      const log = {
        fromCurrency: fromValue,
        toCurrency: toValue,
      };
      const response = await axios.put(
        `http://localhost:8080/savedlogs/${userUID}`,
        log
      );
      notyf.success(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        exchangeRateHandler={(e) => {
          exchangeRateHandler(e);
        }} //change both
        fromValue={fromValue}
        readOnlyMode={false}
      />

      <div className="equals">=</div>

      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeFromValue={(e) => {
          exchangeRateHandler(e.target.value);
        }}
        fromValue={toValue}
        readOnlyMode={true}
      />

      <button onClick={() => handleSave()}>save</button>
    </div>
  );
};

export default CurrencyConvert;
